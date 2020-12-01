import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  align-items: center;
  border-radius: 0.3rem;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);

  font-size: 0.8rem;
  padding: 0.8rem 1rem;

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
  line-height: 1rem;
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
