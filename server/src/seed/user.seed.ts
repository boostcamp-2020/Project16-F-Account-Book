import UserEntity from '@entity/user.entity';
import CategoryEntity from '@entity/category.entity';
import PaymentEntity from '@entity/payment.entity';
import TransactionEntity from '@entity/transaction.entity';

const generateCategories = (user:UserEntity) => {
  const categories = [
    new CategoryEntity({ name: '월급', isIncome: true, user }),   
    new CategoryEntity({ name: '식비', isIncome: false, user })
  ];

  return categories;
}

const generatePayments = (user:UserEntity) => {
  const payments = [
    new PaymentEntity({ name: '신한은행', user }), 
    new PaymentEntity({ name: '국민은행', user }), 
    new PaymentEntity({ name: '농협은행', user })
  ];
  return payments;
}

const generateTransactions = (category: CategoryEntity, user: UserEntity, payment: PaymentEntity) => {
  const transactions = [];
  for (let i = 0; i < 10; i++) {
    const amount = Math.floor(Math.random() * (10000 - 1000) + 1000);
    const description = `${user.name}의 가계부내역 ${i + 1}`;
    const tradeAt = new Date();
    const isIncome = Math.floor(Math.random() * 2) === 1;
    const transaction = new TransactionEntity({ amount, description, tradeAt, isIncome, category, user, payment });
    transactions.push(transaction);
  }
  return transactions;
}

const generateSeedData = (many: number) => {
  const providers = ['google', 'naver', 'kakao'];
  const users = [];
  const categories = [];
  const payments = [];
  const transactions = [];
  
  for (let i = 0; i < many; i++) {
    const user = new UserEntity({ name: `user${i + 1}`, socialId: `user${i + 1}`, socialType: `${providers[i % 3]}` });
    console.log(user);
    users.push(user);
    categories.push(...generateCategories(user));
    console.log(categories);
    payments.push(...generatePayments(user));
    console.log(payments);
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category);
    const payment = payments[Math.floor(Math.random() * payments.length)];
    console.log(payment);
    transactions.push(generateTransactions(category, user, payment))
  }
  return {users, categories, payments, transactions};
}

export default { generateSeedData };
