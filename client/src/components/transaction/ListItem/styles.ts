import styled, { css } from 'styled-components';
import { TransactionListItemStylePropType } from './types';

const ListItem = styled.div<TransactionListItemStylePropType>`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  align-items: center;
  font-size: 0.8rem;

  ${(props) =>
    props.border &&
    css`
      padding: 0.8rem 1rem;
      border-radius: 0.3rem;
      box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
    `}

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
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
};
