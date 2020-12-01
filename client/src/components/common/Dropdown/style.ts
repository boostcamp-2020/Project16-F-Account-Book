import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: none;
  position: absolute;
  right: 0;
  text-decoration: none;
  border: 2px solid #c9c9c9;
  white-space: nowrap;
  margin: 8px 0px 0px 0px;
  border-radius: 15px;
  &.show {
    display: flex;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
  }
`;

export { MenuItem, Button };
