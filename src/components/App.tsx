import React from 'react';
import axios from 'axios';
import Papa from 'papaparse';

import Info from './Info/Info';
import Filters from './Filters/Filters';
import Chart from './Chart/Chart';
import { filterData, groupDataByDate } from '../helpers';

import * as S from './App.styles';
import * as SCommon from './Common.styles';

const DATA_URL = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

export interface DataRow {
  Date: string;
  Datasource: string;
  Campaign: string;
  Clicks: number;
  Impressions: number;
}

export interface DataGroupedByDate {
  [index: string]: DataRow[];
}

export interface IFilters {
  Datasources: string[];
  Campaign: string;
}

enum CSVHeaders {
  DATE = 'Date',
  DATASOURCE = 'Datasource',
  CAMPAIGN = 'Campaign',
  CLICKS = 'Clicks',
  IMPRESSIONS = 'Impressions',
}

const addToTempArray = (tempArray: string[], value: string) => {
  return tempArray.includes(value) ? tempArray : [...tempArray, value];
};

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<DataGroupedByDate>({});
  const [datasources, setDatasources] = React.useState<string[]>([]);
  const [campaigns, setCampaigns] = React.useState<string[]>([]);
  const [filters, setFilters] = React.useState<IFilters>({ Campaign: 'All', Datasources: [] });

  React.useEffect(() => {
    const getData = async () => {
      let data;

      try {
        const axiosResponse = await axios.get(DATA_URL);
        data = axiosResponse.data;
      } catch (e) {
        console.log('connection error');
      }

      let tempDatasources: string[] = [];
      let tempCampaigns: string[] = [];

      const { data: parsedData }: { data: DataRow[] } = Papa.parse(data, {
        skipEmptyLines: true,
        header: true,
        transform(value: string, field: string | number): any {
          switch (field) {
            case CSVHeaders.DATE:
              return value;
            case CSVHeaders.CLICKS:
            case CSVHeaders.IMPRESSIONS:
              return value ? parseInt(value) : 0;
            case CSVHeaders.DATASOURCE:
              tempDatasources = addToTempArray(tempDatasources, value);
              return value;
            case CSVHeaders.CAMPAIGN:
              tempCampaigns = addToTempArray(tempCampaigns, value);
              return value;
            default:
              return value;
          }
        },
      });

      setData(groupDataByDate(parsedData));
      setDatasources(tempDatasources);
      setCampaigns(tempCampaigns);
      setLoading(false);
    };

    getData();
  }, []);

  const handleFiltersChange = React.useCallback((newFilters: IFilters) => {
    setFilters(newFilters);
  }, []);

  const filteredData = React.useMemo(() => {
    return filterData(data, filters, datasources);
  }, [filters, data, datasources]);

  return (
    <S.AppWrapper>
      <SCommon.Row>
        <S.Info>
          <Info />
        </S.Info>
      </SCommon.Row>
      <SCommon.Row>
        <S.Filters>
          <Filters
            loading={loading}
            datasources={datasources}
            campaigns={campaigns}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </S.Filters>
        <S.Chart>
          <Chart data={filteredData} filters={filters} />
        </S.Chart>
      </SCommon.Row>
    </S.AppWrapper>
  );
};

export default App;
