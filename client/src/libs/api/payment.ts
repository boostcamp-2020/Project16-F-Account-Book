import { PaymentModel } from '@commons/types/payment';
import Axios from 'axios';

const paymentAPI = {
  getPayment: async (): Promise<PaymentModel[]> => {
    const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/payment-methods`, {
      withCredentials: true,
    });

    return response.data;
  },
};

export default paymentAPI;
