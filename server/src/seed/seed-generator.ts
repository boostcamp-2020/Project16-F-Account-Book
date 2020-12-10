import UserEntity from '@/entity/user.entity';
import CategoryEntity from '@/entity/category.entity';
import PaymentEntity from '@/entity/payment.entity';
import TransactionEntity from '@/entity/transaction.entity';
import DateUtils from '@/lib/date-utils';

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 100000;

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

    for (let i = 0; i < numOfTransactionsPerMonth - 1; i += 1) {
      const category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
      const payment = payments[Math.floor(Math.random() * payments.length)];
      const amount = Math.floor(Math.random() * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT);
      const description = `${user.name}의 가계부내역 ${i + 1}`;
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
    users.push(user);
    categories.push(...generateCategories(user));
    payments.push(...generatePayments(user));
    transactions.push(
      ...generateTransactions({
        categories,
        payments,
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
