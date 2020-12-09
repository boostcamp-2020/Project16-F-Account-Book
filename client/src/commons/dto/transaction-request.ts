import { TransactionReqeust } from '../types/transaction';

export default class TransactionRequestDTO {
  tid?: number | null;

  isIncome: boolean;

  tradeAt: string;

  cid: number;

  pid: number;

  amount: number;

  description: string;

  constructor(input: TransactionReqeust) {
    this.tid = input.pid ? input.pid : null;
    this.isIncome = input.isIncome === 'true';
    this.tradeAt = input.tradeAt;
    this.cid = Number(input.cid);
    this.pid = Number(input.pid);
    this.amount = Number(input.amount);
    this.description = input.description;
  }
}
