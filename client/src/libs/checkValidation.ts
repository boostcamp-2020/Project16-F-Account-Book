const checkValidation = (name: string, target: string): boolean => {
  if (name === 'amount' && (Number.isNaN(Number(target)) === true || target === '0')) return false;
  if (name === 'tradeAt' && target === '') return false;
  if (target === '0' || target === '0') return false;
  return true;
};

export default checkValidation;
