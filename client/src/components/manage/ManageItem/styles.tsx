import styled from 'styled-components';

export const ManageItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0.3rem;
  width: 100%;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const DeleteImgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 0.5rem;
  height: 1.2rem;
  width: 13%;
  img {
    height: 100%;
  }
  cursor: pointer;
`;

export const ItemTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 65%;
`;

export const UpdateImgContainer = styled.div`
  display: flex;
  height: 1.2rem;
  width: 13%;
  justify-content: flex-end;
  img {
    height: 100%;
  }
  cursor: pointer;
`;
