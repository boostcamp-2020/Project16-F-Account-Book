import PaymentEntity from '@/entity/payment.entity';
import { Repository } from 'typeorm';
import { BAD_REQUEST } from '@/common/error';

export default class PaymentService {
  private paymentRepository: Repository<PaymentEntity>;

  constructor(paymentRepository: Repository<PaymentEntity>) {
    this.paymentRepository = paymentRepository;
  }

  public async createPayment(name: string, uid: number): Promise<void> {
    const payment = this.paymentRepository.create({ name, uid });
    await this.paymentRepository.save(payment);
  }

  public async readPayment(uid: number): Promise<PaymentEntity[]> {
    const payment = await this.paymentRepository.find({
      select: ['pid', 'name'],
      where: { uid },
    });
    return payment;
  }

  public async updatePayment(paymentId: number, name: string, uid: number): Promise<void> {
    const { affected } = await this.paymentRepository.update({ pid: paymentId, uid }, { name });
    if (!affected) {
      throw new Error(BAD_REQUEST);
    }
  }

  public async deletePayment(paymentId: number, uid: number): Promise<void> {
    const { affected } = await this.paymentRepository.delete({ pid: paymentId, uid });
    if (!affected) {
      throw new Error(BAD_REQUEST);
    }
  }
}
