import styled from 'styled-components';

export const Box = styled.div`
  max-width: 100%;
  width: 100%;
  margin-top: 1rem;
`;

export const ItemBox = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.p`
  margin-bottom: 0.7rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Chart = styled.div`
  margin: 1.4rem 0 1.4rem 0;
  box-sizing: border-box;
`;
