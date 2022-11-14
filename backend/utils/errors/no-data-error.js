//  Класс ошибки для кейса 404: ошибка авторизации  //
class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NoDataError;
