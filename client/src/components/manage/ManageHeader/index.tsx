import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { ManageHeaderProps } from './types';
import * as S from './styles';

const ManageHeader = ({ text, onClick }: ManageHeaderProps) => {
  return (
    <S.ManageHeaderContainer>
      <S.ManageTextContainer>{text}</S.ManageTextContainer>
      <S.PlusIconContainer onClick={onClick}>
        <BsPlus />
      </S.PlusIconContainer>
    </S.ManageHeaderContainer>
  );
};

export default ManageHeader;
