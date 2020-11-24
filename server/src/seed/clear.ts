import { getManager } from "typeorm";
import createDBConnection from '@/loader/database';
import UserEntity from '@entity/user.entity';

const clear = async () => {
    await createDBConnection();
    const entityManager = getManager();
    await entityManager.clear(UserEntity);
}

clear();