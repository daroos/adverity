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

const App: React.FC = () => {
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ data, setData ] = React.useState<DataRow[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(DATA_URL);

      const { data: parsedData } = Papa.parse(data, {
        header: true,
        transform(value: string, field: string | number): any {
          switch (field) {
            case 'Date':
              return new Date(value);
            case 'Clicks':
            case 'Impressions':
              return parseInt(value);
            default:
              return value;
          }
        }
      });

      setData(parsedData);
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
