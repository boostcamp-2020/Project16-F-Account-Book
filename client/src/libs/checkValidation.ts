const checkValidation = (name: string, target: string): boolean => {
  if (name === 'amount' && (Number.isNaN(Number(target)) === true || target === '0')) return false;
  if (name === 'tradeAt' && target === '') return false;
  if (target === '0') return false;
  return true;
};

const checkEmpty = (TransactionList: string[]) => {
  const keyList = ['tradeAt', 'amount', 'description', 'isIncome'];
  return keyList.filter((key, i) => {
    if (TransactionList[i] === '' || TransactionList[i] === '0') return false;
    return true;
  });
};
export { checkValidation, checkEmpty };
