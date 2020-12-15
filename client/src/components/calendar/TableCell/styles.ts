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
  &.isCursor {
    cursor: pointer;
  }
  &.isBold {
    font-weight: bold;
    color: #1864ab;
  }
`;

export { TotalIn, TotalOut, CellButton };
