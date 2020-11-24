import styled from 'styled-components';

export default styled.button`
  margin: 0 auto;
  padding: 8px;
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 0.25rem;
  background-size: 24px !important;
  background-repeat: no-repeat !important;
  background-position: 12px 11px !important;
  font-weight: 700;

  & + & {
    margin-top: 8px;
  }
`;
