import { IFilters, DataGroupedByDate, DataRow } from "../components/App";
import groupBy from 'lodash/fp/groupBy';
import { convertStringToDate, formatDateForChart } from "./date";

export const groupDataByDate = (data: DataRow[]) => {
  return groupBy<DataRow>(x => x.Date, data);
};

export const filterData = (data: DataGroupedByDate, filters: IFilters) => {
  // TODO add filters handling
  return data;
};

interface Dataset {
  label: string;
  data: number[];
  borderColor: string[];
  lineTension: number;
  fill: boolean;
  yAxisID: string;
}

interface DataFormattedForChart {
  labels: string[];
  datasets: Dataset[];
}

export const transformDataForChart = (data: DataGroupedByDate): any => {
  const emptyData: DataFormattedForChart = {
    labels: [],
    datasets: [
      {
        label: 'Clicks',
        yAxisID: 'Clicks',
        data: [],
        borderColor: ['rgb(36,98,148)'],
        lineTension: 0,
        fill: false,
      },
      {
        label: 'Impressions',
        yAxisID: 'Impressions',
        data: [],
        borderColor: ['rgb(86,154,184)'],
        lineTension: 0,
        fill: false,
      },
    ],
  };

  return Object.entries(data).reduce((parentAcc, [key, parentCurr]) => {
    const { Clicks, Impressions } = parentCurr.reduce((acc, curr) => {
      return {
        Clicks: acc.Clicks + curr.Clicks,
        Impressions: acc.Impressions + curr.Impressions,
      }
    }, { Clicks: 0, Impressions: 0 });

    return {
      ...parentAcc,
      labels: [...parentAcc.labels, formatDateForChart(convertStringToDate(key))],
      datasets: [
        {
          ...parentAcc.datasets[0],
          data: [...parentAcc.datasets[0].data, Clicks],
        },
        {
          ...parentAcc.datasets[1],
          data: [...parentAcc.datasets[1].data, Impressions],
        }
      ]
    }
  }, emptyData);
};