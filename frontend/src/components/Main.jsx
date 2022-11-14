import React, { useContext } from 'react'
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";

//  Вызываем хуки для работы с профилем и карточками  //
const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) => {

  //  создаем контекст данных профиля текущего пользователя  //
  const profileContext = useContext(CurrentUserContext);
  //  Вместо 3 стейт-переменных сделаем одну из контекста  //
  const { name, avatar, about } = profileContext;
  
//  В галерею карточек вставляем массив карточек с сервера  //
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img className="profile__avatar" src={avatar} alt="Аватар" title="Аватар" />
          <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__user">
            <h1 className="profile__name">{name ?? 'Полив Кустов'}</h1>
            <button className="profile__button profile__button-edit" type="button" 
              onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__job">{about ?? 'Исследователь ок'}</p>
        </div>
        <button className="profile__button profile__button-add" type="button"
          onClick={onAddPlace} aria-label="Добавить место"></button>
      </section>
      <section className="gallery">
        <ul className="elements">
          {cards.map((card) => (
            <Card name={card.name}
                  key={card._id}
                  title={card.name}
                  link={card.link}
                  likesCount={card.likes.length}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;