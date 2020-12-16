import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  padding-top: calc(51px + 1rem);
  padding-bottom: 150px;
  justify-content: center;
  align-items: center;

  img {
    height: 8rem;
  }
`;

export default StyledLoadingSpinner;
