import Koa, { Context } from 'koa';
import loader from './loader';

const app = new Koa();
loader(app);

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
