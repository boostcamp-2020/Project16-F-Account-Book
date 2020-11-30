import React from 'react';
import { ModalHeaderProps } from './types';
import ModalHeaderTextStyle from './style';

function ModalHeaderText({ children }: ModalHeaderProps): JSX.Element {
  return <ModalHeaderTextStyle>{children}</ModalHeaderTextStyle>;
}

export default ModalHeaderText;
