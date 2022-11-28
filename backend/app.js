require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const handleCors = require('./middlewares/handleCors');
// const rateLimit = require('express-rate-limit');  //
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3001,
  // MONGO_DB_URL = 'mongodb://localhost:27017/mestodb', //
  MONGO_DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(MONGO_DB_URL);

const app = express();
//  15.1 подключаем логгер запросов  //
app.use(requestLogger);

//  15.4 Подключаем защиту CORS  //
app.use(handleCors);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
//  15.8 подключаем краш-тест сервера  //
/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
*/
app.use('/', router);
//  15.1 подключаем логгер ошибок  //
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
