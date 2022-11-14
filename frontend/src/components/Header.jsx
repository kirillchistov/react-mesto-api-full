import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo-white.svg';
import burger from '../images/header-menu.svg';
import close from '../images/button-close.svg';

//  Принимаем email и signOut, рендерим компонент JSX компонента шапки  //
//  Меню будет отличаться в зависимости от состояния loggedIn, для мобильной версии - бургер  //
const Header = ({ loggedIn, email, onLogout }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  //  Переключатель состояния меню  //
  const toggleMenu = () => {
    setMenuOpened((state) => !state);
  };

  //  Обработка выхода из залогиненного состояния  //  
  const handleLogout = () => {
    setMenuOpened(false);
    loggedIn = false;
    onLogout();
  };

  //  Орисовываем хедер с контекстным и мобильным меню  //
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
        <Switch>
          <Route path="/sign-in">
            <Link className="header__button" to="sign-up" >
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__button" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/">
            {loggedIn && (
              <button
                className="header__menu-button"
                style={{ backgroundImage: `url(${menuOpened ? close : burger})` }}
                type="button"
                onClick={toggleMenu}
              />
            )}
          </Route>
        </Switch>
      </div>
      <div className={`header__menu-auth ${!menuOpened && 'header__menu-auth_hidden'}`}>
        {email && <span className="header__email">{email}</span>}
        {loggedIn && (
          <Link className="header__button" to="/sign-in" onClick={handleLogout}>
            Выйти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
