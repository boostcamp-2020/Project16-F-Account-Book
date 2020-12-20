import Router from 'koa-router';
import { Context } from 'koa';
import { paymentValidator } from '@/middleware/validator';
import PaymentService from './payment.service';
import PaymentRepository from './payment.repository';

export default class PaymentRouter extends Router {
  private paymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService(PaymentRepository.getPaymentRepository());
  }

  initRouter(): void {
    this.post('/', paymentValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { name } = ctx.request.body;
      const newPayment = await this.paymentService.createPayment(name, uid);
      ctx.status = 201;
      ctx.body = newPayment;
    });

    this.get('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const payment = await this.paymentService.readPayment(uid);
      ctx.body = payment;
    });

    this.patch('/:paymentId', paymentValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { paymentId } = ctx.params;
      const { name } = ctx.request.body;
      const updatedPayment = await this.paymentService.updatePayment(paymentId, name, uid);
      ctx.status = 200;
      ctx.body = updatedPayment;
    });

    this.delete('/:paymentId', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { paymentId } = ctx.params;
      const deletedPayment = await this.paymentService.deletePayment(paymentId, uid);
      ctx.status = 200;
      ctx.body = deletedPayment;
    });
  }
}
