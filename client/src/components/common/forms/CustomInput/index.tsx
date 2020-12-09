import React, { forwardRef } from 'react';
import StyledInput from './styles';
import { InputButtonProps } from './types';

const CustomInput = forwardRef<HTMLInputElement, InputButtonProps>(
  (props: InputButtonProps, ref): JSX.Element => {
    const { placeholder, inputType, name, onChange, value } = props;
    return (
      <StyledInput
        name={name}
        onChange={onChange}
        type={inputType === 'calendar' ? 'date' : 'text'}
        placeholder={placeholder}
        inputType={inputType}
        value={value || ''}
        ref={ref}
      />
    );
  },
);

export default CustomInput;
