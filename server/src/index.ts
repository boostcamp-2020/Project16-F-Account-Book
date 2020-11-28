import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import loader from './loader';

const app = new Koa();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(bodyParser());
loader(app);

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
