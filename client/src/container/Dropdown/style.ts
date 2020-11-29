import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: none;
  position: absolute;
  text-decoration: none;
  border: 2px solid #c9c9c9;
  white-space: nowrap;
  border-radius: 15px;
  &.show {
    display: flex;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  padding:30 0;
  font-size: 20px;
  }
`;

export { MenuItem, Button };
