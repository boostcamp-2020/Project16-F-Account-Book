import React, { useState } from 'react';
import { SelectInputProps } from './types';
import * as S from './style';

function CustomSelectInput(props: SelectInputProps): JSX.Element {
  const { placeholder, children, name, onChange } = props;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <S.SelectInput name={name} onChange={handleChange} value={inputValue}>
      <S.SelectOption defaultValue="" selected>
        {placeholder}
      </S.SelectOption>
      {children?.map((option) => (
        <S.SelectOption value={`${option.id}`} key={`${name}${option.id}`}>
          {option.name}
        </S.SelectOption>
      ))}
    </S.SelectInput>
  );
}

export default CustomSelectInput;
