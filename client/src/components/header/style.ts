import styled from 'styled-components';

const HeaderDiv = styled.div`
  text-align: center;
  padding: 10px 0;
  border: 30px;
  color: #ffffff;
  border-bottom: 3px solid black;
  width: 100%;
`;
const SVG = styled.span`
  fill: #28a745;
  padding: 3px;
`;

const DropDown = styled.button`
  float: right;
  background-color: white;
  border: none;
`;

const LogoDiv = styled.div`
  display: inline-block;
`;

export { HeaderDiv, SVG, DropDown, LogoDiv };
