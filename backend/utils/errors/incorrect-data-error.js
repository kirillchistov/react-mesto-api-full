//  Класс ошибки для кейса 400: ошибка валидации данных  //
class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = IncorrectDataError;
