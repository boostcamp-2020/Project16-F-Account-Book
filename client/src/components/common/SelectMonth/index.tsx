import React, { useState } from 'react';

import Dropdown from '@components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => String(i + 1));

export default function SelectMonth({ month }: SelectMonthType): JSX.Element {
  const dropDonwList = MONTHSLIST.map((v: string) => <li>{v}</li>);

  return <></>;
}
