import PaymentEntity from '@/entity/payment.entity';
import { getRepository, Repository } from 'typeorm';

const getPaymentRepository = (): Repository<PaymentEntity> => {
  return getRepository(PaymentEntity);
};

export default { getPaymentRepository };
