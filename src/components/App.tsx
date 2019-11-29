import React from 'react';
import axios from 'axios';
import Papa from 'papaparse';

import Info from "./Info/Info";

import * as S from './App.styles';

const DATA_URL = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

interface DataRow {
  Date: Date;
  Datasource: string;
  Campaign: string;
  Clicks: number;
  Impressions: number;
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
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ data, setData ] = React.useState<DataRow[]>([]);
  const [ datasources, setDatasources ] = React.useState<string[]>([]);
  const [ campaigns, setCampaigns ] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(DATA_URL);

      let tempDatasources: string[] = [];
      let tempCampaigns: string[] = [];

      const { data: parsedData } = Papa.parse(data, {
        header: true,
        transform(value: string, field: string | number): any {
          switch (field) {
            case CSVHeaders.DATE:
              return new Date(value);
            case CSVHeaders.CLICKS:
            case CSVHeaders.IMPRESSIONS:
              return parseInt(value);
            case CSVHeaders.DATASOURCE:
              tempDatasources = addToTempArray(tempDatasources, value);
              return value;
            case CSVHeaders.CAMPAIGN:
              tempCampaigns = addToTempArray(tempCampaigns, value);
              return value;
            default:
              return value;
          }
        }
      });

      setData(parsedData);
      setDatasources(tempDatasources);
      setCampaigns(tempCampaigns);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <S.AppWrapper>
      <S.Row>
        <S.Info>
          <Info />
        </S.Info>
      </S.Row>
      <S.Row>
        <S.Filters>
          Filters
        </S.Filters>
        <S.Chart>
          Chart
        </S.Chart>
      </S.Row>
    </S.AppWrapper>
  );
};

export default App;
