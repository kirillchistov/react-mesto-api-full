//  Класс карточки места со счетчиком лайков  //
import React, { useContext } from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ link, name, likesCount, onCardClick, onCardLike, onCardDelete, card }) => {
  const user = useContext(CurrentUserContext)
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some((i) => i._id === user._id);
  const handleDeleteClick = () => {
    onCardDelete(card);
  }
  
  const handleLikeClick = () => {
    onCardLike(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          className="element__button-delete"
          onClick={handleDeleteClick}>
        </button>
      )}
      <img className="element__image" src={link} alt={name} title={name} onClick={() => onCardClick(card)} />
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button className={`element__button-like ${isLiked && "element__button-like_active"}`}
            onClick={handleLikeClick}
            type="button" aria-label="Поставить лайк"></button>
        <p className="element__likes-count">{likesCount}</p>
      </div>
    </li>
  );
};

export default Card;