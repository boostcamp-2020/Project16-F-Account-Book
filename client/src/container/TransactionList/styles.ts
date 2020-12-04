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
`;
