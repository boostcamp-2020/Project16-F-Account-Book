import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html,body{
    font-size: 16px;
    color: #363B40;
    height: 100%;

    font-family: 'Noto Sans KR', sans-serif;

    ::-webkit-scrollbar {
      width: 0px;
      background: transparent; 
    }
    
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

  button {
    cursor: pointer;
  }
`;

export default GlobalStyled;
