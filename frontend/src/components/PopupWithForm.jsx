//  Общий компонент для 4 попапов  //
//  Общая разметка: элементы контейнеров, форма, заголовок и 2 кнопки  // 
//  Извне передаются только текст заголовка и идентификатор формы (в виде строк)  //
//  Добавляем пропсы title и name и подставляем их значения в JSX  //

//  Подставляем name в CSS-класс через popup_type_${props.name}`}  //
//  Внутри компонента содержимое попапа доступно через пропс children  //


import React from 'react';

const PopupWithForm = ({ title, name, isOpen, onClose, buttonText, children, onSubmit }) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <h2 className="popup__header">{title}</h2>
        <form className={`popup__form popup__form_${name}`} name={`${name}-form`} onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" name="profile__save" value="Сохранить" className="popup__submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__close" type="button"
          onClick={onClose} aria-label="Закрыть редактирование"></button>
      </div>
    </div>
  );
};

export default PopupWithForm;