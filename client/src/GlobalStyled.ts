import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,body{
    font-size: 16px;
    color: #363B40;

    @media (max-width: 575.98px) { 
      font-size: 14px;
    }
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
`;

export default GlobalStyled;
