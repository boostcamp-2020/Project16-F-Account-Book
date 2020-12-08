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

  public async updatePayment(pid: number, name: string, uid: number): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({ where: { pid, uid } });
    if (!payment) throw new Error(BAD_REQUEST);
    const mergedPayment = await this.paymentRepository.merge(payment, { name });
    const updatedPayment = await this.paymentRepository.save(mergedPayment);
    return updatedPayment;
  }

  public async deletePayment(pid: number, uid: number): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({ where: { pid, uid } });

    if (!payment) throw new Error(BAD_REQUEST);
    await this.paymentRepository.softDelete(payment);
    return payment;
  }
}
