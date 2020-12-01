import React from 'react';
import * as S from './styles';

class ModalProps {
  children?: React.ReactNode;

  show?: boolean = true;

  toggleModal?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Modal({ children, show, toggleModal }: ModalProps): JSX.Element {
  return (
    <S.Modal show={show} onClick={toggleModal}>
      <S.Container
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
      >
        {children}
      </S.Container>
    </S.Modal>
  );
}

export default Modal;
