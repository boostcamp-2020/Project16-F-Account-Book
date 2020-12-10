import styled from 'styled-components';

const DateContainer = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const DateLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export { DateContainer, DateLabel };
