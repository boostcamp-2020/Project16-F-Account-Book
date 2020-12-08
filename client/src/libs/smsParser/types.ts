export type ParsedSMS = {
  cardname: string;
  amount: number;
  date: string;
  time: string;
  resultType?: string;
  paymentType: string;
  isDeposit: boolean;
};
