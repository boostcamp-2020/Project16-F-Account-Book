import DatabaseError from '@/common/error/database';
import NotFoundError from '@/common/error/not-found';
import PaymentEntity from '@/entity/payment.entity';
import { Repository } from 'typeorm';

export default class PaymentService {
  private paymentRepository: Repository<PaymentEntity>;

  constructor(paymentRepository: Repository<PaymentEntity>) {
    this.paymentRepository = paymentRepository;
  }

  public async createPayment(name: string, uid: number): Promise<PaymentEntity> {
    const payment = this.paymentRepository.create({ name, uid });
    const newPayment = await this.paymentRepository.save(payment);

    if (!payment) {
      throw new DatabaseError('Fail to create new payment');
    }
    return newPayment;
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

    if (!payment) {
      throw new NotFoundError('Requested payment resource does not exist');
    }
    const mergedPayment = await this.paymentRepository.merge(payment, { name });
    const updatedPayment = await this.paymentRepository.save(mergedPayment);

    if (!updatedPayment) {
      throw new DatabaseError('Fail to updated payment');
    }

    return updatedPayment;
  }

  public async deletePayment(pid: number, uid: number): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({ where: { pid, uid } });

    if (!payment) {
      throw new NotFoundError('Requested payment resource does not exist');
    }
    await this.paymentRepository.softDelete(payment);
    return payment;
  }
}
