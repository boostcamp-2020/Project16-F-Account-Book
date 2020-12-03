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

const Item = styled.li`
  margin: 13px 8px;
  white-space: nowarp;
  font-weight: bold;
  font-size: 18px;
  word-break: keep-all;
  list-style: none;
`;
export { HeaderDiv, HeaderContentDiv, HeaderLogo, DropDiv, Item };
