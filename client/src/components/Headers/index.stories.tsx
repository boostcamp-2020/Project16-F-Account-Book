import React from 'react';
import StoryRouter from 'storybook-react-router';
import Header from '.';

export default {
  title: 'components/Header',
  component: Header,
  decorators: [StoryRouter()],
};

export const HeaderSample = (): JSX.Element => <Header />;
