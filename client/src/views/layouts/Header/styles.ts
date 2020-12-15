import styled from 'styled-components';

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  padding: 0.3rem 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  z-index: 99;
`;

const HeaderContentDiv = styled.div`
  width: 100%;
  max-width: 738px;
  display: flex;
  height: 40px;
  align-items: center;
  margin: 0 auto;
`;

const HeaderLogo = styled.div`
  flex: 1 1 auto;
  display: inline-block;
`;

const DropDiv = styled.div`
  flex: 0 0 auto;
`;

const Item = styled.li`
  margin: 13px 8px;
  white-space: nowarp;
  font-weight: bold;
  font-size: 18px;
  word-break: keep-all;
  list-style: none;
`;
export { HeaderDiv, HeaderContentDiv, HeaderLogo, DropDiv, Item };
