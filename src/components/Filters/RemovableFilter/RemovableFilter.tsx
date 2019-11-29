import React from 'react';

import * as S from './RemovableFilter.styles';

interface Props {
  name: string;
  onRemove: (name: string) => void;
}

const RemovableFilter: React.FC<Props> = ({ name, onRemove }) => (
  <S.Wrapper>
    <S.Name>{name}</S.Name>
    <S.RemoveIcon>
      <button onClick={() => onRemove(name)}>x</button>
    </S.RemoveIcon>
  </S.Wrapper>
);

export default RemovableFilter;
