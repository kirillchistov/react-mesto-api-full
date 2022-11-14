//  Класс ошибки для кейса 403: ошибка удаления чужой карточки   //
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
