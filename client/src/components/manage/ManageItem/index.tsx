import React, { useState } from 'react';
import deleteIcon from '@/assets/svg/Minus.svg';
import pencilIcon from '@/assets/svg/Pencil.svg';
import * as S from './styles';
import { ManageItemProps } from './types';
import ManageItemInput from '../ManageItemInput';

const ManageItem = ({
  item,
  deleteItem,
  updateItem,
  onChangeInput,
}: ManageItemProps): JSX.Element => {
  const [itemUpdateToggle, setItemUpdateToggle] = useState(false);
  const toggleUpdate = () => setItemUpdateToggle(!itemUpdateToggle);
  const updateHandler = () => {
    updateItem(item.id);
    toggleUpdate();
  };

  const deleteHandler = () => {
    deleteItem(item.id);
  };

  return (
    <>
      {itemUpdateToggle ? (
        <ManageItemInput
          name={item.name}
          cancelHandler={toggleUpdate}
          saveHandler={updateHandler}
          onChangeInput={onChangeInput}
          border={false}
        />
      ) : (
        <S.ManageItemContainer>
          <S.DeleteImgContainer onClick={deleteHandler}>
            <img src={deleteIcon} alt="deleteIcon" />{' '}
          </S.DeleteImgContainer>
          <S.ItemTextContainer> {item.name} </S.ItemTextContainer>
          <S.UpdateImgContainer onClick={toggleUpdate}>
            <img src={pencilIcon} alt="updateIcon" />{' '}
          </S.UpdateImgContainer>
        </S.ManageItemContainer>
      )}
    </>
  );
};

export default ManageItem;
