import CategoryDTO from '@/commons/dto/category';
import CategoryRequestDTO from '@/commons/dto/category-request';
import { CategoryRequest } from '@/commons/types/category';
import ManageHeader from '@/components/manage/ManageHeader';
import ManageItem from '@/components/manage/ManageItem';
import ManageItemInput from '@/components/manage/ManageItemInput';
import { RootState } from '@/modules';
import { postCategoryThunk, updateCategoryThunk } from '@/modules/category';
import { deletePaymentThunk } from '@/modules/payment';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryManageContainerProps } from './types';
import CategoryListContainer from './styles';

const CategoryManageContainer = ({ isIncome }: CategoryManageContainerProps): JSX.Element => {
  const { data } = useSelector((state: RootState) => state.category);
  const categoryList = data
    .filter((category) => category.isIncome === isIncome)
    .map((category) => new CategoryDTO(category));
  const [categoryData, setCategoryData] = useState({ isIncome } as CategoryRequest);
  const [addCategory, setAddCategory] = useState(false);

  const dispatch = useDispatch();

  const toggleAddCategory = useCallback(() => {
    setAddCategory(!addCategory);
  }, [addCategory]);

  const deleteCategory = useCallback(
    (cid) => {
      dispatch(deletePaymentThunk(cid));
    },
    [dispatch],
  );

  const onChangeCategoryName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryData({ ...categoryData, name: e.target.value });
    },
    [categoryData],
  );

  const postNewCategory = useCallback(() => {
    const newCategory = new CategoryRequestDTO(categoryData);
    dispatch(postCategoryThunk(newCategory));
  }, [dispatch, categoryData]);

  const updateCategory = useCallback(
    (cid) => {
      const updateCategoryData = new CategoryRequestDTO({ cid, ...categoryData });
      dispatch(updateCategoryThunk(updateCategoryData));
    },
    [dispatch, categoryData],
  );

  return (
    <>
      <ManageHeader text="카테고리" onClick={toggleAddCategory} />
      {addCategory && (
        <ManageItemInput
          name=""
          cancelHandler={toggleAddCategory}
          saveHandler={postNewCategory}
          onChangeInput={onChangeCategoryName}
          border
        />
      )}
      <CategoryListContainer>
        {categoryList.map((category) => (
          <ManageItem
            item={category}
            deleteItem={deleteCategory}
            updateItem={updateCategory}
            onChangeInput={onChangeCategoryName}
          />
        ))}
      </CategoryListContainer>
    </>
  );
};

export default CategoryManageContainer;
