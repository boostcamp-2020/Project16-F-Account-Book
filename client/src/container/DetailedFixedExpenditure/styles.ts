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

export const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

export const Amount = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #a4a4a4;
`;

export const ItemBox = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
