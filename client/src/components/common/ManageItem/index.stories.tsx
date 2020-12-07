import React from 'react';
import MangeItem from '.';

export default {
  title: 'components/ManageItem',
  component: MangeItem,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const manageItemSample = (): JSX.Element => (
  <MangeItem name="결제수단" deleteItem={() => {}} updateItem={() => {}} />
);
