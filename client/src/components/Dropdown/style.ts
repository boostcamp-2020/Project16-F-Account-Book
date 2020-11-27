import styled from 'styled-components';

const MenuItem = styled.div`
  display: flex;
  position: absolute;
  text-decoration: none;
  border: 2px solid black;
`;

const Item = styled.li`
  margin: 20px 8px;
  white-space: nowarp;
  font-weight: bold;
  font-size: 20px;
  word-break: keep-all;
`;

const UserButton = styled.button`
  background-color: white;
  border: none;
  &:hover {
    ${MenuItem} {
      display: none;
    }
  }
`;

export { MenuItem, Item, UserButton };
