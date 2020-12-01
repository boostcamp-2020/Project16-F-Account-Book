import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { PaymentModel } from '@commons/types/payment';

const paymentAPI = {
  getPayment: async (): Promise<PaymentModel[]> => {
    const payments = await axios.get<PaymentModel[]>(endpoints.PAYMENT_METHOD_API);
    return payments;
  },
};

export default paymentAPI;
