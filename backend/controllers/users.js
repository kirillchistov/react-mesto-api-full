//  14.2 добавляем email и password с хешированием  //
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_ENCRYPT_KEY } = require('../utils/constants');
const User = require('../models/user');
const IncorrectDataError = require('../utils/errors/incorrect-data-error');
const ConflictError = require('../utils/errors/conflict-error');
const NoDataError = require('../utils/errors/no-data-error');

//  Получаем всех пользователей  //
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    next(err);
  }
};

//  Получение юзера по user._id  //
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NoDataError(`Пользователь с id ${req.params.userId} не найден`));
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

//  Получение текущего юзера  - по user._id  //
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NoDataError(`Пользователь с id ${req.params.userId} не найден`));
      return;
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

//  Создание пользователя - передаем name, about, avatar и _id  //
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError(`${req.body.email} - такой пользователь уже зарегистрирован`));
      } else {
        next(err);
      }
    });
};

//  Обновление данных профиля  //
module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NoDataError(`Пользователь с id: ${req.params.userId} не найден`))
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

//  Обновление аватара  //
module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NoDataError(`Пользователь с id: ${req.params.userId} не найден`))
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

//  Контроллер логина  //
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        TOKEN_ENCRYPT_KEY,
        { expiresIn: '7d' },
      );
      return res.cookie('authorization', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
        sameSite: true,
      }).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

//  Контроллер логаута  //
module.exports.logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Ваша сессия завершена' });
};
