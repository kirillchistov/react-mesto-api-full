//  Поля схемы карточки:  //
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Должно быть минимум 2 символа'],
    maxlength: [30, 'Должно быть минимум 30 символов'],
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: (v) => {
      if (validator.isURL(v)) {
        return true;
      }
      return false;
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
