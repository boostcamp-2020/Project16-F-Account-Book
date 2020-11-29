import styled from 'styled-components';

export const StyledTabMenuButton = styled.button`
  flex: 1 auto;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;
  background: transparent;
  cursor: pointer;
  text-align: center;

  &.active {
    border-bottom: 2px solid rgba(0, 0, 0, 0.7);
  }

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const StyledTabMenuButtonGroup = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
