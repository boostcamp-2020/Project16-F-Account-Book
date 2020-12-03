import React from 'react';
import StyledInput from './styles';
import { InputButtonProps } from './types';

const CustomInput = (props: InputButtonProps): JSX.Element => {
  const { placeholder, inputType, name, onChange } = props;
  return (
    <>
      <StyledInput
        name={name}
        onChange={onChange}
        type={inputType === 'calendar' ? 'date' : 'text'}
        placeholder={placeholder}
        inputType={inputType}
      />
    </>
  );
};

export default CustomInput;
