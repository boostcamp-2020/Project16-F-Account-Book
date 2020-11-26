import React from 'react';
import ModalInputText from '.';

export default {
  title: 'components/ModalInput',
  component: ModalInputText,
  decorators: [
    (Story: any) => (
      <div style={{ width: '15rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const ModalAmountInput = (): JSX.Element => (
  <ModalInputText placeholder="금액" inputType="amount" />
);

export const ModalDescriptionInput = (): JSX.Element => (
  <ModalInputText placeholder="상세내용" inputType="description" />
);

export const ModalCalendorInput = (): JSX.Element => (
  <ModalInputText placeholder="날짜선택" inputType="calendar" />
);
