import styled from 'styled-components';

export const SelectorBox = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.5rem;
`;

export const Box = styled.div`
  border-radius: 0.3rem;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 1rem;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

export const BoxTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const BoxRow = styled.div`
  & + & {
    margin-top: 0.7rem;
  }
`;

export const RecentTransactionBoxItem = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const SpendingStatusDescription = styled.span`
  margin-left: 0.5rem;
  font-weight: 600;
  text-align: right;
`;
