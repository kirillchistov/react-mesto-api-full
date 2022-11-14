//  все константы выносим в отдельный файл в папке utils  //

//  Кнопки в профиле  //
export const btnEdit = document.querySelector('.profile__button-edit');
export const btnAdd = document.querySelector('.profile__button-add');

//  Попап, форма и инпуты редактирования профиля  //
export const popupEdit = "#popupProfile";
export const formProfile = document.querySelector('#formProfileEdit');
export const nameInput = document.querySelector('.popup__input_user_name');
export const jobInput = document.querySelector('.popup__input_user_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');
export const btnEditAvatar = document.querySelector(".profile__avatar-edit");

//  Попап и форма редактирования аватара пользователя  //
export const popupEditAvatar = ".popup_edit-avatar";
export const formEditAvatar = document.querySelector('#editAvatarForm');

//  Попап, форма и инпуты добавления нового места  //
export const popupAdd = "#popupAddPlace";
export const formCreateCard = document.querySelector('#formAddPlace');
export const placeNameInput = document.querySelector('.popup__input_place_name');
export const placeLinkInput = document.querySelector('.popup__input_place_link');
export const btnCreateSubmit = document.querySelector('#btnPopupAddPlaceSubmit');

//  Попап открытия карточки места //
export const popupElement = "#popupElement";
export const popupImage = document.querySelector(popupElement).querySelector('.popup__image');
export const popupImageCaption = document.querySelector(popupElement).querySelector('.popup__image-caption');

//  Попап подтверждения удаления карточки  //
export const popupConfirmDelete = "#popupConfirmDeletePlace";

//  Секция с карточками мест  //
export const gallery = document.querySelector('.elements');

//  Глобальные константы  //
export const page = document.querySelector('.page');

// Все попапы в документе //
export const popupList = Array.from(document.querySelectorAll('.popup'));

//  Все кнопки закрытия попапов //
export const btnsClose = document.querySelectorAll('.popup__close');

//  Все картинки карточек  //
export const imgElements = document.querySelectorAll('.element__image');

//  Пустой объект для инициализации переменной FormValidators  //
export const formValidators = {};

//  Селекторы для валидации форм  //
export const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputFieldSet: '.popup__fieldset',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__field-error_type',
  errorClass: 'popup__field-error_active'
};

//  Исходный набор карточек - добавить из https://rosphoto.com/travel/puteshestviya_po_rossii-2668 //
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Карачаевск',
      link: 'https://kirillchistov.github.io/mesto/images/karachaevsk.jpg'
    },
    {
      name: 'Гора Эльбрус',
      link: 'https://kirillchistov.github.io/mesto/images/elbrus.jpg'
    },
    {
      name: 'Домбай',
      link: 'https://kirillchistov.github.io/mesto/images/dombai.jpg'
    }
  ];