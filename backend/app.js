require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//  const cors = require('cors');  //
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const handleCors = require('./middlewares/handleCors');
const router = require('./routes');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_DB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(MONGO_DB_URL);

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

//  15.4 Подключаем защиту CORS  //
app.use(handleCors);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
//  15.1 подключаем логгер запросов  //
app.use(requestLogger);
//  15.8 подключаем краш-тест сервера  //
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
//  15.1 подключаем логгер ошибок  //
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
