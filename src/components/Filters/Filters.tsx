import React, { SyntheticEvent } from 'react';

import { IFilters } from '../App';
import RemovableFilter from './RemovableFilter/RemovableFilter';

import * as S from './Filters.styles';
import * as SCommon from '../Common.styles';

interface Props {
  loading: boolean;
  datasources: string[];
  campaigns: string[];
  filters: IFilters;
  onFiltersChange: (newFilters: IFilters) => void;
}

const Filters: React.FC<Props> = ({ loading, datasources, campaigns, filters, onFiltersChange }) => {
  const [newFilters, setNewFilters] = React.useState<IFilters>(filters);

  const addDatasourceFilter = React.useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      setNewFilters({
        ...newFilters,
        Datasources: [...newFilters.Datasources, e.currentTarget.value],
      });
    },
    [newFilters]
  );

  const removeDatasourceFilter = React.useCallback(
    (datasourceToRemove: string) => {
      setNewFilters({
        ...newFilters,
        Datasources: newFilters.Datasources.filter(datasourceName => datasourceName !== datasourceToRemove),
      });
    },
    [newFilters]
  );

  const handleCampaignChange = React.useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      setNewFilters({ ...newFilters, Campaign: e.currentTarget.value });
    },
    [newFilters]
  );

  const applyFilters = React.useCallback(() => {
    onFiltersChange(newFilters);
  }, [newFilters, onFiltersChange]);

  if (loading) return <S.Wrapper>Loading... </S.Wrapper>;

  return (
    <S.Wrapper>
      <SCommon.Heading>Filter dimension values</SCommon.Heading>
      <SCommon.Row>
        <S.DatasourceSelect>
          <SCommon.Label htmlFor="Datasource">Datasource</SCommon.Label>
          <select id="Datasource" onChange={addDatasourceFilter} multiple>
            {datasources
              .filter(datasource => !newFilters.Datasources.includes(datasource))
              .map(datasource => (
                <option key={datasource}>{datasource}</option>
              ))}
          </select>
        </S.DatasourceSelect>
        <S.DatasourceActiveFilters>
          <SCommon.Label>Active filters</SCommon.Label>
          {newFilters.Datasources.length
            ? newFilters.Datasources.map(datasourceFilter => (
                <RemovableFilter key={datasourceFilter} name={datasourceFilter} onRemove={removeDatasourceFilter} />
              ))
            : 'none'}
        </S.DatasourceActiveFilters>
      </SCommon.Row>

      <SCommon.Row>
        <S.CampaignFilterWrapper>
          <SCommon.Label htmlFor="Campaign">Campaign</SCommon.Label>
          <select onChange={handleCampaignChange}>
            <option value="All">All</option>
            {campaigns.map(campaign => (
              <option key={campaign}>{campaign}</option>
            ))}
          </select>
        </S.CampaignFilterWrapper>
      </SCommon.Row>

      <SCommon.Row>
        <S.ApplyButton onClick={applyFilters}>Apply</S.ApplyButton>
      </SCommon.Row>
    </S.Wrapper>
  );
};

export default Filters;
