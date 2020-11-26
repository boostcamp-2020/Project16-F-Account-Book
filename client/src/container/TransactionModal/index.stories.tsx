import React from 'react';
import TransactionModal from '.';

export default {
  title: 'container/TransactionModal',
  component: TransactionModal,
  decorators: [
    (Story: any) => (
      <div style={{ width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export { TransactionModal };
