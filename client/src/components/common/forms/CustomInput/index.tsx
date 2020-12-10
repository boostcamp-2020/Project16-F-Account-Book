import React, { forwardRef } from 'react';
import StyledInput from './styles';
import { InputButtonProps } from './types';

const CustomInput = forwardRef<HTMLInputElement, InputButtonProps>(
  (props: InputButtonProps, ref): JSX.Element => {
    const { placeholder, inputType, name, onChange, initialValue } = props;
    return (
      <StyledInput
        name={name}
        onChange={onChange}
        type={inputType === 'calendar' ? 'date' : 'text'}
        placeholder={placeholder}
        inputType={inputType}
        ref={ref}
        defaultValue={initialValue || ''}
      />
    );
  },
);

export default CustomInput;
