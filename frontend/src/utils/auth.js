//  Делаем auth.js как в тренажере и на вебинаре  //
//  Общий метод request для обращения к серверу  //
//  Если есть токен, запускаем Authorization  //
//  Если fetch вернул data, возвращаем json  //

const BASE_URL = 'https://auth.nomoreparties.co';

const request = async ({
  url,
  method = 'POST',
  token,
  data,
}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...!!token && { 'Authorization': `Bearer ${token}` },
    },
    ...!!data && { body: JSON.stringify(data) },
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}

export const register = (email, password) => {
  return request({
    url: '/signup',
    data: { email, password },
  })
};

export const authorize = (email, password) => {
  return request({
    url: '/signin',
    data: { email, password },
  })
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  })
}