//  Защищенный роут для доступа только после логина  //
//  Проверяем статус логина и грузим детей или редирект на вход  //

import React from 'react';
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Redirect to="/sign-in" />;
};

export default ProtectedRoute;