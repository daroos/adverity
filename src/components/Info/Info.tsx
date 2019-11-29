import React from 'react';

import * as S from './Info.styles';

const Info = () => (
  <S.Wrapper>
    <p>- Select zero to N Datasources</p>
    <p>- Select zero to N Campaigns</p>
    <p>
      <small>(where zero means "All")</small>
    </p>
    <p>
      Hitting "Apply" filters the chart to show a timeseries for both Clicks and Impressions for given Datasources and
      Campaigns - logical AND
    </p>
  </S.Wrapper>
);

export default Info;
