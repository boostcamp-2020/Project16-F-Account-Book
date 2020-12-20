export const mockTransactions = [
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-01',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-10-05',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-03',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-18',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 5000,
    tradeAt: '2020-12-20',
    description: 'user1의 가계부내역 82',
    isIncome: false,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: false,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-21',
    description: 'user1의 가계부내역 82',
    isIncome: false,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: false,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 5000,
    tradeAt: '2020-10-22',
    description: 'user1의 가계부내역 82',
    isIncome: false,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: false,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-10-23',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-27',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-30',
    description: 'user1의 가계부내역 82',
    isIncome: true,
    uid: 1,
    cid: 2,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 2,
      name: '식비',
      isIncome: true,
      uid: 1,
    },
  },
];

export const totalInOut: any = {
  1: { totalIn: 150, totalOut: 5000 },
  5: { totalIn: 10000, totalOut: 0 },
  13: { totalIn: 10000, totalOut: 0 },
  18: { totalIn: 50000, totalOut: 40000 },
  20: { totalIn: 20000, totalOut: 25000 },
  21: { totalIn: 0, totalOut: 5000 },
  22: { totalIn: 10000, totalOut: 0 },
  23: { totalIn: 0, totalOut: 5000 },
  27: { totalIn: 10000, totalOut: 0 },
  30: { totalIn: 0, totalOut: 10000 },
};

export const mockAggregateCategoryData = {
  income: [
    {
      category: '월급',
      aggregate: '300000',
      dataArray: [
        {
          tid: 1,
          amount: 300000,
          tradeAt: new Date(),
          description: 'mock transaction',
          payment: '신한은행',
        },
      ],
    },
  ],
  expenditure: [
    {
      category: '식비',
      aggregate: '3000',
      dataArray: [
        {
          tid: 1,
          amount: 3000,
          tradeAt: new Date(),
          description: 'mock transaction',
          payment: '신한체크',
        },
      ],
    },
  ],
};

export const mockCategories = [
  { cid: 1, name: '식비', isIncome: false, uid: 1 },
  { cid: 2, name: '교통', isIncome: false, uid: 1 },
];

export const mockFixedExpenditure = {
  paid: [
    {
      fid: 1,
      tradeAt: new Date(),
      amount: 10000,
      description: 'mockPaid1',
    },
    {
      fid: 2,
      tradeAt: new Date(),
      amount: 20000,
      description: 'mockPaid2',
    },
  ],
  estimated: [
    {
      fid: 3,
      tradeAt: new Date(),
      amount: 10000,
      description: 'mockEstimated1',
    },
  ],
};

export const mockMostSpendingCategory = {
  name: 'category',
  aggregate: '20000',
};

export const mockOverspendingIndexDetail = {
  overspendingIndex: 0.7,
  averageIncome: 100,
  expenditureThisMonth: 70,
};

export const mockPayments = [
  { pid: 1, name: '신한카드', uid: 1 },
  { pid: 2, name: '네이버페이', uid: 1 },
];
