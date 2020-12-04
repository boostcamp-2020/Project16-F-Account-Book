import styled from 'styled-components';

const DefaultStyle = styled.div`
  border-radius: 0.3rem;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;

export const Box = styled(DefaultStyle)`
  max-width: 100%;
  width: 100%;
  margin-top: 1rem;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

export const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;

  p {
    margin-bottom: 5px;
  }
`;

export const SumBox = styled.div`
  display: flex;
  align-items: center;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  svg {
    color: #0e7ee0;
    margin-right: 0.8rem;
  }
`;
export const TextBox = styled.div``;

export const SumTitle = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const Amount = styled.p`
  font-size: 0.9rem;
`;
