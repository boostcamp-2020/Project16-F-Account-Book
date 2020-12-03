import Koa from 'koa';
import loader from './loader';

const port = process.env.PORT || 4000;
const app = new Koa();

loader(app);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
