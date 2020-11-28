import FixedExpenditureEntity from 'entity/fixed-expenditure.entity';
import { getRepository, Repository } from 'typeorm';

const getFixedExpenditureRepository = (): Repository<FixedExpenditureEntity> => {
  return getRepository(FixedExpenditureEntity);
};

export default { getFixedExpenditureRepository };
