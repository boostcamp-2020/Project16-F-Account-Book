import styled from 'styled-components';

const DefaultStyle = styled.div`
  border-radius: 0.3rem;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;

export const BoxTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const TotalInOutBox = styled(DefaultStyle)`
  max-width: 100%;
  width: 100%;
  margin-top: 1rem;
`;

export const TotalInOutBoxItem = styled.div`
  & + & {
    margin-top: 0.7rem;
  }
`;

export const RecentTransactionBox = styled(DefaultStyle)`
  margin-top: 1rem;
`;

export const RecentTransactionBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

export const RecentTransactionBoxItem = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
