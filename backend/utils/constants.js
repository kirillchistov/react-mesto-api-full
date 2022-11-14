//  Константы с кодами ошибок также есть в отдельных классах в ./errors  //
const INCORRECT_DATA_ERROR = 400; // некорректные данные  //
const UNAUTHORIZED_ERROR = 401; // ошибка авторизации  //
const FORBIDDEN_ERROR = 403; // ошибка доступа к объекту - удалить чужую карточку  //
const NO_DATA_ERROR = 404; // карточка или пользователь не найден  //
const CONFLICT_ERROR = 409; // пользователь с таким email уже зарегистрирован  //
const DEFAULT_ERROR = 500; // ошибка по-умолчанию  //

module.exports = {
  INCORRECT_DATA_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NO_DATA_ERROR,
  CONFLICT_ERROR,
  DEFAULT_ERROR,
};

//  ключик пока держим здесь  //

module.exports.TOKEN_ENCRYPT_KEY = '7f4efea4d68fc1c806f72ba452efd8106b6a0cb48f523ee4332ebe70a704274f';
