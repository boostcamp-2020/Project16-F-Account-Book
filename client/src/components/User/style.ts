import styled from 'styled-components';
import { SelectPagePropType } from './types';

const MenuItem = styled.div`
  display: ${(props: SelectPagePropType) => props.display};
  float: right;
  text-decoration: none;
  border: 2px solid black;
`;

const Item = styled.li`
  margin: 20px 8px;
  font-weight: bold;
  font-size: 30px;
`;
export { MenuItem, Item };
