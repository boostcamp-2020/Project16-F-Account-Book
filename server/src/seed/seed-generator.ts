import UserEntity from '@/entity/user.entity';
import CategoryEntity from '@/entity/category.entity';
import PaymentEntity from '@/entity/payment.entity';
import TransactionEntity from '@/entity/transaction.entity';
import DateUtils from '@/lib/date-utils';

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 100000;

const descriptions = [
  [],
  ['간식 구입', '부스트식당에서 밥먹음', '커피 한잔'],
  ['버스비', '지하철비', '지각해서 택시'],
  ['세탁비', '이너 티셔츠 구입', '바지 구입', '패딩 구입'],
];

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateCategories = (user: UserEntity) => {
  const categories = [
    new CategoryEntity({ name: '월급', isIncome: true, user }),
    new CategoryEntity({ name: '식비', isIncome: false, user }),
    new CategoryEntity({ name: '교통/통신', isIncome: false, user }),
    new CategoryEntity({ name: '패션', isIncome: false, user }),
  ];

  return categories;
};

const generatePayments = (user: UserEntity) => {
  const payments = [
    new PaymentEntity({ name: '신한은행', user }),
    new PaymentEntity({ name: '신한카드', user }),
    new PaymentEntity({ name: 'KB국민카드', user }),
  ];
  return payments;
};

const generateTransactions = ({
  categories,
  user,
  payments,
  numOfTransactionsPerMonth,
  startDate,
  endDate,
}: {
  categories: CategoryEntity[];
  payments: PaymentEntity[];
  user: UserEntity;
  numOfTransactionsPerMonth: number;
  startDate: Date;
  endDate: Date;
}) => {
  const transactions = [];
  const date = new Date(startDate);
  const endDateTime = endDate.getTime();
  while (date.getTime() <= endDateTime) {
    const {
      startDate: startDateOfMonth,
      endDate: endDateOfMonth,
    } = DateUtils.getStartDateAndEndDate(date.getFullYear(), date.getMonth() + 1);

    transactions.push(
      new TransactionEntity({
        amount: 3000000,
        description: '월급',
        tradeAt: new Date(date.setDate(25)),
        isIncome: true,
        category: categories[0],
        user,
        payment: payments[0],
      }),
    );

    transactions.push(
      new TransactionEntity({
        amount: 50000,
        description: '휴대폰 비',
        tradeAt: new Date(date.setDate(18)),
        isIncome: false,
        category: categories[2],
        user,
        payment: payments[1],
      }),
    );

    for (let i = 0; i < numOfTransactionsPerMonth - 1; i += 1) {
      const categoryIdx = Math.floor(Math.random() * (categories.length - 1)) + 1;
      const category = categories[categoryIdx];
      const payment = payments[Math.floor(Math.random() * payments.length)];
      const amount = Math.floor(Math.random() * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT);
      const descriptionsOfCategory = descriptions[categoryIdx];
      if (categoryIdx > 3) {
        console.log(categoryIdx);
        console.log(categories);
      }
      const description =
        descriptionsOfCategory[Math.floor(Math.random() * descriptionsOfCategory.length)];
      const tradeAt = generateRandomDate(startDateOfMonth, endDateOfMonth);
      const isIncome = false;
      const transaction = new TransactionEntity({
        amount,
        description,
        tradeAt,
        isIncome,
        category,
        user,
        payment,
      });
      transactions.push(transaction);
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
  }
  return transactions;
};

const generateSeedData = ({
  numOfUsers,
  numOfTransactionsPerMonth,
  startDate,
  endDate,
}: {
  numOfUsers: number;
  numOfTransactionsPerMonth: number;
  startDate: Date;
  endDate: Date;
}): {
  users: UserEntity[];
  categories: CategoryEntity[];
  payments: PaymentEntity[];
  transactions: TransactionEntity[];
} => {
  const providers = ['google', 'naver', 'kakao'];
  const users = [];
  const categories = [];
  const payments = [];
  const transactions = [];

  for (let i = 0; i < numOfUsers; i += 1) {
    const user = new UserEntity({
      name: `user${i + 1}`,
      socialId: `user${i + 1}-123456789`,
      socialType: `${providers[i % 3]}`,
    });
    const categoriesOfUser = generateCategories(user);
    const paymentsOfUser = generatePayments(user);

    users.push(user);
    categories.push(...categoriesOfUser);
    payments.push(...paymentsOfUser);
    transactions.push(
      ...generateTransactions({
        categories: categoriesOfUser,
        payments: paymentsOfUser,
        user,
        numOfTransactionsPerMonth,
        startDate,
        endDate,
      }),
    );
  }
  return { users, categories, payments, transactions };
};

export default { generateSeedData };
