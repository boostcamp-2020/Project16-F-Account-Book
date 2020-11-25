import UserEntity from '@entity/user.entity';
import CategoryEntity from '@entity/category.entity';
import PaymentEntity from '@entity/payment.entity';
import TransactionEntity from '@entity/transaction.entity';

const NUM_OF_USERS = 10000;
const NUM_OF_TRANSACTIONS_PER_USER = 100;
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 10000;

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
    new PaymentEntity({ name: '국민은행', user }),
    new PaymentEntity({ name: '농협은행', user }),
  ];
  return payments;
};

const generateTransactions = (
  category: CategoryEntity,
  user: UserEntity,
  payment: PaymentEntity,
) => {
  const transactions = [];
  for (let i = 0; i < NUM_OF_TRANSACTIONS_PER_USER; i += 1) {
    const amount = Math.floor(Math.random() * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT);
    const description = `${user.name}의 가계부내역 ${i + 1}`;
    const tradeAt = generateRandomDate(new Date('2020-01-01'), new Date());
    const isIncome = Math.floor(Math.random() * 2) === 1;
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
  return transactions;
};

const generateSeedData = () => {
  const providers = ['google', 'naver', 'kakao'];
  const users = [];
  const categories = [];
  const payments = [];
  const transactions = [];

  for (let i = 0; i < NUM_OF_USERS; i += 1) {
    const user = new UserEntity({
      name: `user${i + 1}`,
      socialId: `user${i + 1}`,
      socialType: `${providers[i % 3]}`,
    });
    users.push(user);
    categories.push(...generateCategories(user));
    payments.push(...generatePayments(user));
    const category = categories[Math.floor(Math.random() * categories.length)];
    const payment = payments[Math.floor(Math.random() * payments.length)];
    transactions.push(...generateTransactions(category, user, payment));
  }
  return { users, categories, payments, transactions };
};

export default generateSeedData;
