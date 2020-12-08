import { PaymentRequest } from '../types/payment';

export default class PaymentRequestDTO {
  pid?: number | null;

  name!: string;

  constructor(input: PaymentRequest) {
    this.name = input.name;
    this.pid = input.pid ? input.pid : null;
  }
}
