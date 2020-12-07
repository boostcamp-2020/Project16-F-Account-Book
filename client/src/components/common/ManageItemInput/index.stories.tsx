import React from 'react';
import MangeItemInput from '.';

export default {
  title: 'components/MangeItemInput',
  component: MangeItemInput,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const mangeItemSample = (): JSX.Element => <MangeItemInput name="결제수단 예시" />;
