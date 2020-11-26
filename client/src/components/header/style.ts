import styled from 'styled-components';

const HeaderDiv = styled.div`
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

const LogoDiv = styled.div`
  text-align: center;
`;

const UserButton = styled.button`
  display: float;
  float: right;
  background-color: white;
  border: none;
`;

export { HeaderDiv, SVG, LogoDiv, UserButton };
