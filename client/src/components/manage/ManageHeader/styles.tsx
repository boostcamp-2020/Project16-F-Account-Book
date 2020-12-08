import styled from 'styled-components';

export const ManageHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding: 1.2rem 1.5rem;
  border-radius: 0.3rem;
  box-shadow: 0.5px 1px 4px 1px rgba(0, 0, 0, 0.2);
`;

export const ManageTextContainer = styled.div`
  display: flex;
  font-size: large;
  font-weight: bold;
  align-items: center;
`;

export const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 100%;
  }
  cursor: pointer;
`;
