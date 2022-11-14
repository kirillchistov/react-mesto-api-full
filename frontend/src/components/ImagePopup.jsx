//  Здесь всё просто, пока не имеет пропсов и вложенного содержимого  //

import React from 'react';

const ImagePopup = ({ isOpen, card, onClose }) => {
  return (
    <div className={`popup popup_view-photo ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__element">  
        <figure className="popup__container-photo">
          <button className="popup__close popup__close_photo-container" type="button"
            onClick={onClose} aria-label="Закрыть"></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;