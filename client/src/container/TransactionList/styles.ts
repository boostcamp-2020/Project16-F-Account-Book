import styled from 'styled-components';

export const DateContainer = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

export const DateLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const TransactionListItemWrapper = styled.div`
  margin-left: 0.5rem;
`;
