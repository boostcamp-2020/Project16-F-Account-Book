import { PaymentModel } from '@/commons/types/payment';

const cache: PaymentModel[] = [];

const set = (categories: PaymentModel[]): void => {
  cache.push(...Array.from(categories));
};

const get = (): PaymentModel[] => {
  return [...Array.from(cache)];
};

const clear = (): void => {
  cache.splice(0);
};

export default { set, get, clear };
