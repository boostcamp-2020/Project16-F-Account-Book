import styled from 'styled-components';
import { EmptyStateComponentProps } from './types';

const StyledEmptyState = styled.div<EmptyStateComponentProps>`
  padding-top: 0.5rem;
  text-align: ${(props) => props.align};
`;

export default StyledEmptyState;
