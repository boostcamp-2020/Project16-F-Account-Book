import { PaymentModel } from '../types/payment';

export default class PaymentDTO {
  id: number;

  name: string;

  uid: number;

  constructor(payment: PaymentModel) {
    this.id = payment.pid;
    this.name = payment.name;
    this.uid = payment.uid;
  }
}
