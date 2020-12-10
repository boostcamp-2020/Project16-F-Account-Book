import styled from 'styled-components';

const HeaderDiv = styled.div`
  left: 1;
  height: 10%;
  font-size: 1rem;
  font-weight: bold;
  color: #333333;
`;
const CalendarDiv = styled.div`
  display: inline-flex;
  height: 60%;
  padding: 0px, 16px;
  margin-bottom: 2rem;
`;

const TransactionDiv = styled.div`
  display: block;
`;

const CalendarPageDiv = styled.div`
  hight: 100%;
  width: 100%;
`;

const WarpCalendarDiv = styled.div`
  display: block;
  height: 100%;
  scroll-behavior: smooth;
  padding-bottom: 3rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const InOutDiv = styled.div`
  display: block;
  text-align: left;
  margin-left: 1rem;
  & + & {
    margin-top: 6px;
  }
`;

export { HeaderDiv, CalendarDiv, TransactionDiv, CalendarPageDiv, WarpCalendarDiv, InOutDiv };
