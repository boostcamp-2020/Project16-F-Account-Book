import React from 'react';
import CustomInput from '.';

export default {
  title: 'components/forms/CustomInput',
  component: CustomInput,
  decorators: [
    (Story: any) => (
      <div style={{ width: '15rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const AmountInput = (): JSX.Element => <CustomInput placeholder="금액" inputType="amount" />;

export const DescriptionInput = (): JSX.Element => (
  <CustomInput placeholder="상세내용" inputType="description" />
);

export const CalendorInput = (): JSX.Element => (
  <CustomInput placeholder="날짜선택" inputType="calendar" />
);
