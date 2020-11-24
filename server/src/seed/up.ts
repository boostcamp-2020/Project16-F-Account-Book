import { getManager } from "typeorm";
import createDBConnection from '@/loader/database';
import UserSeed from './user.seed';
    
const up = async () => {
    await createDBConnection();
    const entityManager = getManager();
    const {users, categories, payments, transactions} = UserSeed.generateSeedData(5);
    await entityManager.insert('User', users);
    await entityManager.insert('Category', categories);
    await entityManager.insert('Payment', payments);
    await entityManager.insert('Transaction', transactions);
}

up();