import styled from 'styled-components';

const TotalIn = styled.div`
  text-align: center;
`;

const TotalOut = styled.div`
  text-align: center;
  padding-left: 3px;
`;
const CellButton = styled.td`
  position: relative;
  text-align: center;
`;

const ClickCircle = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 0;
  margin-left: 24px;
  border-radius: 50%;
  background-color: rgba(250, 185, 189, 0.6);
`;

export { TotalIn, TotalOut, CellButton, ClickCircle };
