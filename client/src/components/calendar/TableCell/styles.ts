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
  cursor: pointer;
  text-align: center;
  &.isBold {
    font-weight: bold;
    color: #f21800;
  }
`;

export { TotalIn, TotalOut, CellButton };
