import styled from 'styled-components';

export const ModalSelectInput = styled.select`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  font-size: 1rem;
  justify-content: flex-start;
  width: 100%;
  height: 2.1rem;
  min-width: 5px;
  resize: none;
  padding: 0.2rem 0rem;
  margin: 0.5rem 0rem;
  color: #757575;
`;

export const ModalSelectOption = styled.option`
  display: flex;
  width: 100%;
  max-width: 90%;
  border-bottom: 1px solid #767676;
`;
