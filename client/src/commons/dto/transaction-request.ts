import { PostTransactionRequest } from '../types/transaction';

export default class TransactionRequestDTO {
  isIncome: boolean;

  tradeAt: Date;

  cid: number;

  pid: number;

  amount: number;

  description: string;

  constructor(postInput: PostTransactionRequest) {
    this.isIncome = postInput.isIncome === 'true';
    this.tradeAt = postInput.tradeAt;
    this.cid = Number(postInput.cid);
    this.pid = Number(postInput.pid);
    this.amount = Number(postInput.amount);
    this.description = postInput.description;
  }
}
