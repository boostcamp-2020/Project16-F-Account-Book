import styled from 'styled-components';

const Matrix = styled.div``;

const Thead = styled.thead`
  color: #9e9e9e;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: none;
  border-collapse: collapse;
`;

const Tbody = styled.tbody``;

const HeaderTr = styled.tr`
  height: 70px;
  font-size: large;
  color: #333333;
  font-weight: bold;
`;

const DayTr = styled.tr`
  height: 70px;
  font-size: large;
  color: #616060;
`;

const Th = styled.th`
  height: 30px;
  vertical-align: middle;
`;

export { Table, Tbody, DayTr, Thead, Matrix, Th, HeaderTr };
