import React from 'react';
import PopupWithForm from './PopupWithForm';

//  Обработчик кнопки подтверждения вызывает функцию удаления и закрывает попап  //
//  Карточка cardToDelete помечается на удаление при клике (в App.jsx)  // 
const ConfirmationPopup = ({ isOpen, onClose, cardToDelete, onCardDelete, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(cardToDelete);
    onClose();
  }

  return (
    <PopupWithForm 
      name="confirm" 
      title="Вы уверены?" 
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onCardDelete={onCardDelete}
      isValid={true}
    />
  )
}

export default ConfirmationPopup;