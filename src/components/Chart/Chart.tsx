import React from 'react';
import { Line } from 'react-chartjs-2';

import { transformDataForChart } from '../../helpers/dataTransformers';
import { DataGroupedByDate, IFilters } from '../App';

import * as S from './Chart.styles';
import ChartInfo from './ChartInfo/ChartInfo';

const options = {
  scales: {
    yAxes: [
      {
        id: 'Clicks',
        type: 'linear',
        position: 'left',
      },
      {
        id: 'Impressions',
        type: 'linear',
        position: 'right',
      },
    ],
    xAxes: [
      {
        maxTicksLimit: 2,
      },
    ],
  },
};

interface Props {
  data: DataGroupedByDate;
  filters: IFilters;
}

const Chart: React.FC<Props> = ({ data, filters }) => {
  const transformedChartData = React.useMemo(() => {
    return transformDataForChart(data);
  }, [data]);

  return (
    <S.Wrapper>
      <S.Info>
        <ChartInfo filters={filters} />
      </S.Info>
      <Line data={transformedChartData} options={options} />
    </S.Wrapper>
  );
};

export default Chart;
