import { Reset } from 'styled-reset';
import GlobalStyled from '../src/GlobalStyled';

export const decorators = [
  (Story) => (
    <>
      <Reset />
      <GlobalStyled />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
