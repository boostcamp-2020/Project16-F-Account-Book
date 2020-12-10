import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding-top: calc(51px + 1rem);
  padding-bottom: 150px;
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  .github-link {
    margin-left: 0.5rem;

    img {
      height: 17px;
    }
  }
`;
