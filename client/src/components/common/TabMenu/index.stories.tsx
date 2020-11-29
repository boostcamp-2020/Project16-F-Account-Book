import React from 'react';
import TabMenu from '.';

export default {
  title: 'components/TabMenu',
  component: TabMenu,
};

const list = [
  {
    tabName: 'Tab1',
    children: <p>Tab1 내용입니다.</p>,
  },
  {
    tabName: 'Tab2',
    children: <p>Tab2 내용입니다.</p>,
  },
  {
    tabName: 'Tab3',
    children: <p>Tab3 내용입니다.</p>,
  },
];

export const tabMenuSample = (): JSX.Element => <TabMenu list={list} />;
