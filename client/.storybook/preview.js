import { Reset } from 'styled-reset';
import GlobalStyled from '@/GlobalStyled';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <>
      <Reset />
      <GlobalStyled />
      <Story />
    </>
  ),
];
