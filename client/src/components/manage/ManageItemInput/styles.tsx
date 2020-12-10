import styled from 'styled-components';
import { ManageItemInputContainerProps } from './types';

export const ManageItemInputContainer = styled.div<ManageItemInputContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 1rem;
  width: 100%;
  border-radius: 0.3rem;
  margin-top: ${(props) => (props.border ? `1rem` : `none`)};
  box-shadow: ${(props) => (props.border ? `0.5px 1px 4px 1px rgba(0, 0, 0, 0.2)` : 'none')};
  border-bottom: ${(props) => (props.border ? `none` : '1px solid rgba(0, 0, 0, 0.1)')};
`;

export const ManageInputBoxContainer = styled.div`
  flex: 1;
`;

export const ManageButtonContainer = styled.div`
  flex: 0 0 100px;
  display: inline-flex;
  margin-left: 2rem;

  button + button {
    margin-left: 1rem;
  }
`;
