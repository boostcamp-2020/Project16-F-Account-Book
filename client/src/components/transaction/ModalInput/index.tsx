import React from 'react';
import StyledInput from './styles';
import { ModalInputProps } from './types';

const ModalInput = (props: ModalInputProps): JSX.Element => {
  const { placeholder, inputType, name, onChange, value } = props;
  return (
    <StyledInput
      name={name}
      onChange={onChange}
      type={inputType === 'calendar' ? 'date' : 'text'}
      placeholder={placeholder}
      inputType={inputType}
      value={value || ''}
    />
  );
};

export default ModalInput;
