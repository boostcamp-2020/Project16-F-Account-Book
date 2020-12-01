import React from 'react';
import StyledInput from './styles';
import { InputButtonProps } from './types';

const CustomInput = (props: InputButtonProps): JSX.Element => {
  const { placeholder, inputType } = props;
  return (
    <>
      <StyledInput
        type={inputType === 'calendar' ? 'date' : 'text'}
        placeholder={placeholder}
        inputType={inputType}
      />
    </>
  );
};

export default CustomInput;
