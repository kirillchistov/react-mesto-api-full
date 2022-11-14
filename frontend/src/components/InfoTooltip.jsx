import React from 'react';
import success from '../images/success.png';
import fail from '../images/fail.png';

const InfoTooltip = ({ popupText, isOpen, onClose, loggedIn }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-tooltip">
        <button className="popup__close" type="button" onClick={onClose} />
        <div className="popup__container-tooltip">
          <img
            className="popup__registration-image"
            src={loggedIn ? success : fail}
            alt="Попап с информацией"
          />
          <div className="popup__tooltip-title">{popupText}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
