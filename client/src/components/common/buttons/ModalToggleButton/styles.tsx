import styled from 'styled-components';

export const ModalButton = styled.button`
  display: flex;
  position: fixed;
  bottom: 3rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.36);
  z-index: 100;
  background: #0e7ee0;

  @media (min-width: 992px) {
    right: calc((100% - 930px) / 2);
  }
`;

export const ModalButtonContent = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
