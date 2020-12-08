export type PaymentModel = {
  pid: number;
  name: string;
  uid: number;
};

export interface PaymentRequest {
  pid?: number;
  name: string;
}

export interface PostPaymentRequest extends PaymentRequest {
  name: string;
}

export interface UpdatePaymentRequest extends PaymentRequest {
  pid: number;
  name: string;
}
