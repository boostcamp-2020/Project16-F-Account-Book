import CategoryDTO from '@/commons/dto/category';
import CategoryRequestDTO from '@/commons/dto/category-request';
import { CategoryRequest } from '@/commons/types/category';
import ManageHeader from '@/components/manage/ManageHeader';
import ManageItem from '@/components/manage/ManageItem';
import checkOverlap from '@/libs/checkOverlap';
import ManageItemInput from '@/components/manage/ManageItemInput';
import { RootState } from '@/modules';
import {
  deleteCategoryThunk,
  getCategoryThunk,
  postCategoryThunk,
  updateCategoryThunk,
} from '@/modules/category';
import React, { useCallback, useEffect, useState } from 'react';
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
  const checkValidation = checkOverlap(categoryData.name, categoryList);

  const dispatch = useDispatch();

  const getCategoryList = useCallback(() => {
    dispatch(getCategoryThunk());
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  const toggleAddCategory = useCallback(() => {
    setAddCategory(!addCategory);
  }, [addCategory]);

  const deleteCategory = useCallback((cid) => {
    dispatch(deleteCategoryThunk(cid));
  }, []);

  const onChangeCategoryName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryData({ ...categoryData, name: e.target.value });
    },
    [categoryData],
  );

  const postNewCategory = useCallback(() => {
    const newCategory = new CategoryRequestDTO(categoryData);
    dispatch(postCategoryThunk(newCategory));
    toggleAddCategory();
    setCategoryData({ isIncome } as CategoryRequest);
  }, [categoryData, isIncome]);

  const updateCategory = useCallback(
    (cid) => {
      if (checkValidation) {
        const updateCategoryData = new CategoryRequestDTO({ cid, ...categoryData });
        dispatch(updateCategoryThunk(updateCategoryData));
        setCategoryData({ isIncome } as CategoryRequest);
      }
    },
    [categoryData],
  );

  return (
    <>
      <ManageHeader text="카테고리" onClick={toggleAddCategory} />
      {addCategory && (
        <ManageItemInput
          name={categoryData.name}
          cancelHandler={toggleAddCategory}
          saveHandler={postNewCategory}
          onChangeInput={onChangeCategoryName}
          border
          isValid={checkValidation}
        />
      )}
      {categoryList.length !== 0 && (
        <CategoryListContainer>
          {categoryList.map((category) => (
            <ManageItem
              item={category}
              deleteItem={deleteCategory}
              updateItem={updateCategory}
              onChangeInput={onChangeCategoryName}
              key={`m-category${category.id}`}
            />
          ))}
        </CategoryListContainer>
      )}
    </>
  );
};

export default CategoryManageContainer;
