import Router from 'koa-router';
import { Context } from 'koa';
import PaymentService from './payment.service';
import PaymentRepository from './payment.repository';

export default class PaymentRouter extends Router {
  private paymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService(PaymentRepository.getPaymentRepository());
  }

  initRouter(): void {
    this.post('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { name } = ctx.request.body;
      await this.paymentService.createPayment(name, uid);
      ctx.status = 200;
    });

    this.get('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const payment = await this.paymentService.readPayment(uid);
      ctx.body = payment;
    });

    this.patch('/:paymentId', async (ctx: Context) => {
      const { paymentId } = ctx.params;
      const { name } = ctx.request.body;
      await this.paymentService.updatePayment(paymentId, name);
      ctx.status = 200;
    });
  }
}
