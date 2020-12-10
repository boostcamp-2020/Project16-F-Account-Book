import styled from 'styled-components';
import { ImgContainerProps } from './types';

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.8rem 0;

  & + & {
    margin-top: 0.7rem;
  }
`;

const ListItemContentsRow = styled.div`
  display: flex;
  width: 100%;
  & + & {
    margin-top: 1rem;
  }
`;

const ListItemDescription = styled.div`
  flex: 1;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListIteImgContainer = styled.div<ImgContainerProps>`
  display: ${(props) => (props.editable ? 'block' : 'none')};
  flex: 0 0 20px;
  height: 1rem;
  img {
    height: 100%;
  }
  cursor: pointer;
`;

const ListItemPaymentInfo = styled.div`
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.6);
`;

const ListItemAmount = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

export default {
  ListItem,
  ListItemContentsRow,
  ListItemDescription,
  ListItemPaymentInfo,
  ListItemAmount,
  ListIteImgContainer,
};
