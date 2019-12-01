import React from 'react';
import { IFilters } from '../../App';

interface Props {
  filters: IFilters;
}

const ChartInfo: React.FC<Props> = ({ filters }) => {
  const renderDatasources = React.useMemo(() => {
    if (filters.Datasources.length === 0) {
      return 'All datasources';
    }

    return filters.Datasources.reduce((acc, curr, index) => {
      if (index !== filters.Datasources.length - 1) {
        return `${acc} "${curr}" and`;
      }

      return `${acc} "${curr}"`;
    }, '');
  }, [filters.Datasources]);

  const renderCampaign = React.useMemo(() => {
    if (!filters.Campaign) return 'All Campaigns';

    return `Campaign ${filters.Campaign}`;
  }, [filters.Campaign]);

  return (
    <>
      {renderDatasources}; {renderCampaign}
    </>
  );
};

export default ChartInfo;
