import React from 'react';
import deleteIcon from '@/assets/svg/minus.svg';
import pencilIcon from '@/assets/svg/pencil.svg';
import * as S from './styles';
import { MangeItemProps } from './types';

const MangeItem = ({ name, deleteItem, updateItem }: MangeItemProps): JSX.Element => {
  return (
    <S.MangeItemContainer>
      <S.DeleteImgContainer onClick={deleteItem}>
        <img src={deleteIcon} alt="deleteIcon" />{' '}
      </S.DeleteImgContainer>
      <S.ItemTextContainer> {name} </S.ItemTextContainer>
      <S.UpdateImgContainer onClick={updateItem}>
        <img src={pencilIcon} alt="updateIcon" />{' '}
      </S.UpdateImgContainer>
    </S.MangeItemContainer>
  );
};

export default MangeItem;
