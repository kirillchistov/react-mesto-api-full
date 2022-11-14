const Card = require('../models/card');
const ForbiddenError = require('../utils/errors/forbidden-error');
const NoDataError = require('../utils/errors/no-data-error');
const IncorrectDataError = require('../utils/errors/incorrect-data-error');

//  Получаем все карточки   //
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

//  Создаем карточку   //
module.exports.createCard = async (req, res, next) => {
  try {
    const creatorId = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: creatorId });
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

//  Удаляем карточку с проверкой свой/чужой   //
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NoDataError(`Карточка с id ${req.params.cardId} не найдена`);
      } else if (card.owner.toHexString() !== req.user._id) {
        throw new ForbiddenError('Карточку другого пользователя удалить нельзя');
      }
      return card.delete()
        .then(() => {
          res.status(200).send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError(`Переданы некорректные данные для удаления карточки с id ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

//  Ставим лайк. Если нет карточки с таким id, отвечаем 404   //
module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NoDataError(`Карточка с id ${req.params.cardId} не найдена`));
      return;
    }
    res.send({ message: 'Лайк добавлен' });
  } catch (err) {
    next(err);
  }
};

//  Минусаем лайк. Если у карточки лайков нет, удаляем _id из массива  //
module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      next(new NoDataError(`Карточка с id ${req.params.cardId} не найдена`));
      return;
    }
    res.send({ message: 'Лайк удален' });
  } catch (err) {
    next(err);
  }
};
