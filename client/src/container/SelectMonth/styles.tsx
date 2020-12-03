import styled from 'styled-components';

const MonthDiv = styled.div`
  display: flex;
`;

const ScollDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  border-box: box-sizing;
  width: 90px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0px 0px 5px white;
  }

  justify-content: center;
  align-items: center;
`;

const DropdownPosition = styled.div`
  text-align: top;
  margin-top: -5px;
`;
const Item = styled.li`
  display: inline-block;
  white-space: nowarp;
  font-weight: bold;
  font-size: 16px;
  width: 3rem;
  height: 1rem;
  word-break: keep-all;
  list-style: none;
  cursor: pointer;
`;

const MonthList = styled.li`
  margin: 5px 0px;
`;

export { DropdownPosition, Item, ScollDiv, MonthDiv, MonthList };
