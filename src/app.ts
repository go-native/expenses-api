import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expenseRouter from './routes/expense';
import categoryRouter from './routes/category';
import testApiRouter from './routes/test-api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/expenses', expenseRouter)
app.use('/categories', categoryRouter)
app.use('/test-api', testApiRouter)
// // catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

export default app