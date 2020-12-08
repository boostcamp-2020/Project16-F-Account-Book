import React from 'react';
import ManageItemInput from '.';

export default {
  title: 'components/ManageItemInput',
  component: ManageItemInput,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManageItemSample = (): JSX.Element => <ManageItemInput name="결제수단 예시" />;
