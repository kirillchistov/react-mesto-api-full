//  15.4 Настраиваем защиту от злоумышленников: CORS  //
//  Массив доменов, с которых разрешены кросс-доменные запросы  //
const allowedCors = [
  'https://kirmesto.nomoredomains.icu',
  'http://kirmesto.nomoredomains.icu',
  'https://montecristo.nomoredomains.icu',
  'http://montecristo.nomoredomains.icu',
  'localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
];

// eslint-disable-next-line consistent-return
//  Сохраняем источник и тип/метод запроса  //
//  Разрешаем кросс-доменные запросы любых типов (по умолчанию)  //
//  Сохраняем список заголовков исходного запроса  //
//  Проверяем, что источник запроса есть среди разрешённых  //
//  Устанавливаем заголовок, разрешающий браузеру запросы с источника  //
//  Если это предварительный запрос, добавляем нужные заголовки  //
//  Разрешаем кросс-доменные запросы с этими заголовками  //
const handleCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.status(200).send();
  }
  return next();
};

module.exports = handleCors;
