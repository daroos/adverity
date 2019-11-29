import React, { SyntheticEvent } from 'react';
import { IFilters } from '../App';

import * as S from './Filters.styles';
import * as SCommon from '../Common.styles';
import RemovableFilter from './RemovableFilter/RemovableFilter';

interface Props {
  loading: boolean;
  datasources: string[];
  campaigns: string[];
  filters: IFilters;
  onDatasourceFilterChange: (newDatasourceFilter: string[]) => void;
  onCampaignChange: (campaign: string) => void;
}

const Filters: React.FC<Props> = ({
  loading,
  datasources,
  campaigns,
  filters,
  onDatasourceFilterChange,
  onCampaignChange,
}) => {
  const addDatasourceFilter = React.useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      onDatasourceFilterChange([...filters.Datasources, e.currentTarget.value]);
    },
    [filters.Datasources, onDatasourceFilterChange]
  );

  const removeDatasourceFilter = React.useCallback(
    (datasourceToRemove: string) => {
      const newFilters = filters.Datasources.filter(datasourceName => datasourceName !== datasourceToRemove);

      onDatasourceFilterChange(newFilters);
    },
    [filters.Datasources, onDatasourceFilterChange]
  );

  if (loading) return <S.Wrapper>Loading... </S.Wrapper>;

  return (
    <S.Wrapper>
      <SCommon.Heading>Filter dimension values</SCommon.Heading>
      <SCommon.Row>
        <S.DatasourceSelect>
          <SCommon.Label htmlFor="Datasource">Datasource</SCommon.Label>
          <select id="Datasource" onChange={addDatasourceFilter}>
            {datasources
              .filter(datasource => !filters.Datasources.includes(datasource))
              .map(datasource => (
                <option key={datasource}>{datasource}</option>
              ))}
          </select>
        </S.DatasourceSelect>
        <S.DatasourceActiveFilters>
          <SCommon.Label>Active filters</SCommon.Label>
          {filters.Datasources.length
            ? filters.Datasources.map(datasourceFilter => (
                <RemovableFilter name={datasourceFilter} onRemove={removeDatasourceFilter} />
              ))
            : 'none'}
        </S.DatasourceActiveFilters>
      </SCommon.Row>

      <SCommon.Row>
        <S.CampaignFilterWrapper>
          <SCommon.Label htmlFor="Campaign">Campaign</SCommon.Label>
          <select onChange={(e: SyntheticEvent<HTMLSelectElement>) => onCampaignChange(e.currentTarget.value)}>
            <option value={undefined}>All</option>
            {campaigns.map(campaign => (
              <option key={campaign}>{campaign}</option>
            ))}
          </select>
        </S.CampaignFilterWrapper>
      </SCommon.Row>
    </S.Wrapper>
  );
};

export default Filters;
