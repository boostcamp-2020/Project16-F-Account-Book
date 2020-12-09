import React from 'react';
import ManageItem from '.';

export default {
  title: 'components/ManageItem',
  component: ManageItem,
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

export const ManageItemSample = (): JSX.Element => (
  <ManageItem
    item={exampleItem}
    deleteItem={() => {}}
    updateItem={() => {}}
    value={exampleItem.name}
  />
);
