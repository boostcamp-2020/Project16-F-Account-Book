import styled from 'styled-components';

const MenuItem = styled.div`
  display: flex;
  position: absolute;
  text-decoration: none;
  border: 2px solid black;
`;

const Item = styled.li`
  margin: 20px 8px;
  font-weight: bold;
  font-size: 30px;
`;

const UserButton = styled.button`
  background-color: white;
  border: none;
`;

export { MenuItem, Item, UserButton };
