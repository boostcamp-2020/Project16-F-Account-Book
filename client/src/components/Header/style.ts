import styled from 'styled-components';

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  padding: 0.3rem 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
`;

const HeaderContentDiv = styled.div`
  text-align: center;
  height: 40px;
`;

const HeaderLogo = styled.div`
  display: inline-block;
  margin-top: 5px;
  margin-right: -48px;
`;

const DropDiv = styled.div`
  float: right;
  margin-top: 3px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

export { HeaderDiv, HeaderContentDiv, HeaderLogo, DropDiv };
