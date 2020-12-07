import React from 'react';
import ManageHeader from '.';

export default {
  title: 'components/ManageHeader',
  component: ManageHeader,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const manageHeader = (): JSX.Element => <ManageHeader text="결제수단관리" />;
