import React from 'react';
import { ModalHeaderProps } from './types';
import ModalHeaderTextStyle from './styles';

const ModalHeaderText = ({ children }: ModalHeaderProps): JSX.Element => {
  return <ModalHeaderTextStyle>{children}</ModalHeaderTextStyle>;
};

export default ModalHeaderText;
