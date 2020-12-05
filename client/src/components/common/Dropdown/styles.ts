import styled from 'styled-components';

const MenuItem = styled.div`
  background-color: white;
  display: flex;
  position: absolute;
  text-align: center;
  text-decoration: none;
  border: 1px solid #c9c9c9;
  white-space: nowrap;
  margin: 8px 0px 0px 0px;
  border-radius: 15px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  &.right {
    right: 0;
  }
`;

const IconDiv = styled.div``;

export { MenuItem, IconDiv };
