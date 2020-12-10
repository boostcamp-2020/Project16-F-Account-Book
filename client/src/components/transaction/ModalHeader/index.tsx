import React from 'react';
import ModalHeaderText from '../ModalHeaderText';
import ModalXButton from '../ModalXButton';
import StyledModalHeader from './styles';
import { ModalHeaderProps } from './types';

const ModalHeader = ({ text, toggleModal }: ModalHeaderProps): JSX.Element => {
  return (
    <StyledModalHeader>
      <ModalHeaderText>{text}</ModalHeaderText>
      <ModalXButton onClickEvent={toggleModal} />
    </StyledModalHeader>
  );
};

export default ModalHeader;
