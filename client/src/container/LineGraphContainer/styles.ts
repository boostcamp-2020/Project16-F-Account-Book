import styled from 'styled-components';

export const StyledLineGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: 1rem auto;
  .div {
    display: flex;
  }
  border-radius: 0.3rem;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
  padding: 0.6rem;
`;

export const LineGraphText = styled.div`
  margin: 0.5rem 0rem 1.5rem 0rem;
  font-weight: bold;
`;
