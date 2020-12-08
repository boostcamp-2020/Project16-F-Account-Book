import PaymentRequestDTO from '@/commons/dto/payment-request';
import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { PaymentModel } from '@commons/types/payment';

const paymentAPI = {
  getPayment: async (): Promise<PaymentModel[]> => {
    const payments = await axios.get<PaymentModel[]>(endpoints.PAYMENT_METHOD_API);
    return payments;
  },

  postPayment: async (data: PaymentRequestDTO): Promise<PaymentModel> => {
    const payment = await axios.post<PaymentModel>(endpoints.PAYMENT_METHOD_API, { ...data });
    return payment;
  },

  updatePayment: async (data: PaymentRequestDTO): Promise<PaymentModel> => {
    const payment = await axios.patch<PaymentModel>(`${endpoints.PAYMENT_METHOD_API}/${data.pid}`, {
      ...data,
    });
    return payment;
  },

  deletePayment: async (pid: number): Promise<PaymentModel> => {
    const payment = await axios.delete<PaymentModel>(`${endpoints.PAYMENT_METHOD_API}/${pid}`);
    return payment;
  },
};

export default paymentAPI;
