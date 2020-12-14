import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,body{
    font-size: 16px;
    color: #363B40;
    height: 100%;

    ::-webkit-scrollbar {
    width: 0px;
    background: transparent; 
  }

    @media (max-width: 575.98px) { 
      font-size: 14px;
    }
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  

  a {
    &:link {
      color: inherit;
      text-decoration: none;
    }
    &:visited {
      color: inherit;
      text-decoration: none;
    }
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyled;
