import React, { useState } from 'react';
import deleteIcon from '@/assets/svg/minus.svg';
import pencilIcon from '@/assets/svg/pencil.svg';
import * as S from './styles';
import { MangeItemProps } from './types';
import MangeItemInput from '../ManageItemInput';

const MangeItem = ({ item, deleteItem, updateItem }: MangeItemProps): JSX.Element => {
  const [itemUpdateToggle, setItemUpdateToggle] = useState(false);

  const toggleUpdate = () => setItemUpdateToggle(!itemUpdateToggle);

  const updateHandler = (e: React.MouseEvent<HTMLElement>) => {
    updateItem();
    toggleUpdate();
  };

  return (
    <>
      {itemUpdateToggle ? (
        <MangeItemInput name={item.name} cancelHandler={toggleUpdate} saveHandler={updateHandler} />
      ) : (
        <S.MangeItemContainer>
          <S.DeleteImgContainer onClick={deleteItem}>
            <img src={deleteIcon} alt="deleteIcon" />{' '}
          </S.DeleteImgContainer>
          <S.ItemTextContainer> {item.name} </S.ItemTextContainer>
          <S.UpdateImgContainer onClick={toggleUpdate}>
            <img src={pencilIcon} alt="updateIcon" />{' '}
          </S.UpdateImgContainer>
        </S.MangeItemContainer>
      )}
    </>
  );
};

export default MangeItem;
