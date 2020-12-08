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

const exampleItem = {
  id: 1,
  name: '결제수단 예시',
};

export const mangeItemSample = (): JSX.Element => (
  <MangeItem item={exampleItem} deleteItem={() => {}} updateItem={() => {}} />
);
