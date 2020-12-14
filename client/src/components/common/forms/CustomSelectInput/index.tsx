import React, { useEffect, useRef, useState } from 'react';
import { SelectInputProps } from './types';
import * as S from './style';

const CustomSelectInput = (props: SelectInputProps): JSX.Element => {
  const { placeholder, children, name, onChange, value } = props;
  const initialValue = value?.id || 0;
  const [inputValue, setInputValue] = useState(initialValue);
  const selectInput = useRef<HTMLSelectElement>(null);

  const getMatchedOptionValue = () => {
    const idx = children?.findIndex((child) => {
      return child.name === value?.name;
    });
    if (idx === -1) return 0;
    return children[idx].id;
  };

  useEffect(() => {
    if (!value) return;
    const matchedValue = getMatchedOptionValue();
    setInputValue(matchedValue);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(Number(e.target.value));
    onChange(e);
  };

  return (
    <S.SelectInput name={name} onChange={handleChange} value={inputValue} ref={selectInput}>
      <S.SelectOption value={0} selected>
        {placeholder}
      </S.SelectOption>
      {children?.map((option) => (
        <S.SelectOption value={`${option.id}`} key={`${name}${option.id}`}>
          {option.name}
        </S.SelectOption>
      ))}
    </S.SelectInput>
  );
};

export default CustomSelectInput;
