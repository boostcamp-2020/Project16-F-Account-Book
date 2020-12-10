import styled from 'styled-components';

export const Box = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const CategoryName = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
export const LeftBox = styled.div``;
export const BottomBox = styled.div`
  display: flex;
`;
export const Percent = styled.p``;
export const Agregate = styled.p``;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;
export const DetailBox = styled.div`
  display: ${(props) => props.style?.display};
`;

export const DetailItemBox = styled.div`
  padding: 0.7rem 0;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DetailInfo = styled.p``;
