import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: none;
  position: absolute;
  right: 0;
  text-align: center;
  text-decoration: none;
  border: 2px solid #c9c9c9;
  white-space: nowrap;
  margin: 8px 0px 0px 0px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
