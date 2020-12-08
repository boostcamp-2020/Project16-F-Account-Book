import styled from 'styled-components';

export const MangeItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0.3rem;
  width: 100%;
  border-radius: 0.3rem;
  box-shadow: 0.5px 1px 4px 1px rgba(0, 0, 0, 0.2);
`;

export const DeleteImgContainer = styled.div`
  display: flex;
  justify-content: center;
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
  justify-content: center;
  img {
    height: 100%;
  }
  cursor: pointer;
`;
