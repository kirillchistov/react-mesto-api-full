//  Класс ошибки для кейса 401: ошибка авторизации  //
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
