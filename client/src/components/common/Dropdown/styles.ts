import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: none;
  position: absolute;
  text-align: center;
  text-decoration: none;
  border: 1px solid #c9c9c9;
  white-space: nowrap;
  margin: 8px 0px 0px 0px;
  border-radius: 15px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  &.show {
    display: flex;
  }
  &.right {
    right: 0;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
`;

export { MenuItem, Button };
