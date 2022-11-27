//  Импортируем библиотеки, хуки, компоненты, утилиты  //
import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import {api} from '../utils/api';
import * as auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../index.css';

//  Вызываем хуки для открытия и закрытия попапов  //
const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  
  //  создаем стейт текущего пользователя и эффект при монтировании api.getUserInfo  //
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [cards, setCards] = useState([]);

  //  Функцию для роутинга пользователя после логина и выхода  //
  const history = useHistory();

  //  Создаем переменную для проверки на наличие открытого попапа  //
  const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  //  Обрабатываем авторизацию - сохраняем токен, сообщение, закрываем попап, шлем на главную  //
  //  Поправить текст на 'Вы успешно авторизовались' и 'Что-то пошло не так! Попробуйте ещё раз.'  //
  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((data) => {
        if (!data.token) return;
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        setMessage('Успешная авторизация');
        history.push('/');
      })
      .catch(err => {
        setLoggedIn(false);
        setMessage('Что-то не так! Ещё раз.');
        console.log(`Ошибка авторизации: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        setIsPopupOpen(true);
        setTimeout(closeAllPopups, 3000);
      })
  }

  //  Обрабатываем регистрацию - сохраняем логин на сервере, закрываем попап, шлем на логин  //
  //  Поправить текст на 'Вы успешно зарегистрировались' и 'Что-то пошло не так! Попробуйте ещё раз.'  //
  const handleRegister = (email, password) => {
    setIsLoading(true);
    auth.register(email, password)
      .then((res) => {
        setMessage('Успешная регистрация!');
        history.push('/sign-in');
      })
      .catch(err => {
        setMessage('Что-то не так! Ещё раз.');
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
          setIsLoading(false);
          setIsPopupOpen(true);
          setTimeout(closeAllPopups, 3000);
        })
  }
  
  //  Хук с функцией проверки токена и логином пользователя в случае успеха  //
  useEffect(() => {
    const tokenCheck = () => {
      if (!localStorage.getItem("jwt")) return;
      const jwt = localStorage.getItem("jwt");
      return auth
        .getContent(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
        });
    }  
    tokenCheck();
  }, [history]);

  //  Создаем функцию логаута (удаляем токен из лок хранилища)  //
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }

  //  Хук для получения профиля и карточек залогиненного юзера  //
  useEffect(() => {
    loggedIn && 
      Promise.all([
        api.getProfile(), 
        api.getCards()
      ])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
          history.push('/');
        })
        .catch(err => console.log(`Ошибка первой загрузки: ${err}`))
  }, [history, loggedIn]);

  //  Хук с функцией закрытия попапов при нажатии Escape  //
  useEffect(() => {
    const closeByEscape = (err) => {
      if(err.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  //  Обрабатываем смену аватара в профиле  //
  const handleAvatarUpdate = async (obj) => {
    setIsLoading(true);
    try {
        const avatarChanged = await api.setAvatar(obj);
        setCurrentUser(avatarChanged);
        closeAllPopups();
    } catch (err) {
      console.log(`Ошибка обновления аватара: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  //  Добавляем обработчик в соотв-вии с пропсом onUpdateUser компонента EditProfilePopup  //
  //  Внутри этого обработчика вызовите api.setUserInfo  //
  //  После завершения запроса обновите стейт currentUser из полученных данных и закройте все попапы  //  
  const handleUpdateUser = async (obj) => {
    setIsLoading(true);
    try {
      const changedProfile = await api.setProfile(obj);
      setCurrentUser(changedProfile);
      closeAllPopups();
    } catch (err) {
      console.log(`Ошибка обновления профиля: ${err}`);
    } finally {
      setIsLoading(false);      
    }
  }

  //  Обрабатываем добавление новой карточки  //
  const handleAddPlace = async (obj) => {
    setIsLoading(true);
    try {
        const newPlace = await api.addCard(obj);
        setCards([newPlace, ...cards]);
        closeAllPopups();
    } catch(err) {
      console.log(`Ошибка добавления новой карточки: ${err}`);
    } finally {
        setIsLoading(false);
    }
  }

  //  Обрабатываем лайк: проверяем, есть ли уже лайк и меняем статус  //
  //  Отправляем запрос в API и получаем обновлённые данные карточки  //
  //  Формируем новый массив, подставляя в старый новую карточку с сервера  //
  //  Записываем новое состояние карты в State и обновляем / рендерим все  //
  const handleLikeStatus = (card) => {
    setCards((state) => state.map((c) => c._id === card._id ? card : c));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) {
      api.deleteLike(card)
      .then(handleLikeStatus)
      .catch((err) => {
        console.log(err);
      })
    } else {
      api.addLike(card)
      .then(handleLikeStatus)
      .catch((err) => {
        console.log(err);
      })
    }
  }

  //  Обрабатываем удаление карточки. Сначала проверяем, наша ли карточка   //
  const handleCardDelete = async (card) => {
    setIsLoading(true);
    try {
        await api.deleteCard(card);
        setCards((newArray) => newArray.filter((item) => card._id !== item._id))
        closeAllPopups();
    } catch (err) {
      console.log(`Ошибка удаления карточки: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  //  Создаем императивные обработчики для кнопок открытия попапов  //
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setCardToDelete(card);
    setIsConfirmationPopupOpen(true);
  };

  //  Закрываем все попапы  //
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  //  Вставляем компоненты Header, Main, Footer и компоненты попапов  //
  //  Оборачиваем JSX в провайдер контекста с currentUser  //  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header 
          email={email}
          loggedIn={loggedIn}
          onLogout={handleLogout} 
        />
        <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              closePopup={closeAllPopups}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login title="Вход" buttonText="Войти" onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register title="Регистрация" buttonText="Зарегистрироваться" 
            onRegister={handleRegister}
            />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          popupText={message}
          isOpen={isPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
        />        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
          isLoading={isLoading}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={isImagePopupOpen} 
        />
        <ConfirmationPopup 
          cardToDelete={cardToDelete} 
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isOpen={isConfirmationPopupOpen} 
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;