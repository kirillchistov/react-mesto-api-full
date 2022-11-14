//  Класс ошибки для кейса 409: регистрация с email, который есть в базе  //
class NoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 200;
  }
}

module.exports = NoError;
