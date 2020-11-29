import styled from 'styled-components';

export const StyledTabMenuButton = styled.button`
  position: relative;
  flex: 1 auto;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;
  background: transparent;
  cursor: pointer;
  text-align: center;

  &.active::before {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    content: '';
    background: rgba(0, 0, 0, 0.7);
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
