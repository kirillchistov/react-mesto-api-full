//  15.4 Настраиваем защиту от злоумышленников: CORS  //
const allowedCors = [
    'https://kirmesto.nomoredomains.icu',
    'http://kirmesto.nomoredomains.icu',
];  

// eslint-disable-next-line consistent-return
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
  next();
};
  
module.exports = handleCors;
