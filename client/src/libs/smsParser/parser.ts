import { ParsedSMS } from './types';

const tokenize = (sms: string) => {
  return sms
    .replace(/\[web발신\]/i, '')
    .trim()
    .split(/[\s\n\r]/g)
    .filter((e) => e);
};

const parsePaymentType = (sms: string) => {
  const paymentTypeTokens = sms.match('입금|출금|지급');
  if (paymentTypeTokens) {
    const [paymentType] = paymentTypeTokens;
    return {
      paymentType: '이체',
      isDeposit: paymentType === '입금',
    };
  }

  const cardTypeTokens = sms.match('체크');
  const resultTypeTokens = sms.match('취소|거절');
  const resultType = resultTypeTokens ? resultTypeTokens[0] : '승인';

  return {
    paymentType: cardTypeTokens ? '체크카드' : '신용카드',
    isDeposit: resultType === '취소',
    resultType,
  };
};

const parsePaymentDetail = (sms: string) => {
  const paymentDetail = {
    cardname: '',
    amount: 0,
    date: '',
    time: '',
  };
  const smsTokens = tokenize(sms);
  smsTokens.forEach((token, i) => {
    if (i === 0) {
      const cardName = token.replace(/[[\]]/gi, '').substring(0, 2).toUpperCase();
      paymentDetail.cardname = cardName;
    }
    if (token.includes('원') && !paymentDetail.amount) {
      const amountTokens = token.match(/[0-9]+(,?[0-9]+)+/);
      const [amount] = amountTokens;
      if (amount) {
        paymentDetail.amount = Number(amount.replace(',', ''));
      }
      return;
    }
    if (token.includes(':')) {
      const timeTokens = token.match(/[0-9]{2}:[0-9]{2}/);
      const [time] = timeTokens;
      if (time) {
        paymentDetail.time = time;
      }
    }
    if (token.includes('/')) {
      const dateTokens = token.match(/[0-9]{2}\/[0-9]{2}/);
      const [date] = dateTokens;
      if (date) {
        paymentDetail.date = date;
      }
    }
  });
  return paymentDetail;
};

const parse = (sms: string): ParsedSMS => {
  const paymentType = parsePaymentType(sms);
  const paymentDetail = parsePaymentDetail(sms);
  return { ...paymentType, ...paymentDetail };
};

export default { parse };
