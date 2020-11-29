import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: none;
  position: absolute;
  text-decoration: none;
  border: 2px solid #292929;
  &.show {
    display: flex;
  }
`;

const Item = styled.li`
  margin: 20px 8px;
  white-space: nowarp;
  font-weight: bold;
  font-size: 20px;
  word-break: keep-all;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  padding:30 0;
  font-size: 20px;
  }
`;

export { MenuItem, Item, Button };
