import PaymentRequestDTO from '@/commons/dto/payment-request';
import axios from '@/libs/axios';
import endpoints from '@/commons/endpoints';
import { PaymentModel } from '@/commons/types/payment';
import cache from '@/libs/cache/paymentCache';

const paymentAPI = {
  getPayment: async (): Promise<PaymentModel[]> => {
    const cachedData = cache.get();
    if (cachedData.length !== 0) {
      return cachedData;
    }
    const payments = await axios.get<PaymentModel[]>(endpoints.PAYMENT_METHOD_API);
    cache.set(payments);
    return payments;
  },

  postPayment: async (data: PaymentRequestDTO): Promise<PaymentModel> => {
    const payment = await axios.post<PaymentModel>(endpoints.PAYMENT_METHOD_API, { ...data });
    cache.clear();
    return payment;
  },

  updatePayment: async (data: PaymentRequestDTO): Promise<PaymentModel> => {
    const payment = await axios.patch<PaymentModel>(`${endpoints.PAYMENT_METHOD_API}/${data.pid}`, {
      ...data,
    });
    cache.clear();
    return payment;
  },

  deletePayment: async (pid: number): Promise<PaymentModel> => {
    const payment = await axios.delete<PaymentModel>(`${endpoints.PAYMENT_METHOD_API}/${pid}`);
    cache.clear();
    return payment;
  },
};

export default paymentAPI;
