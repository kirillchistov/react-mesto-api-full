//  Класс для работы с API. Все запросы должны быть методами этого класса  //
//  Переносим сюда создание серверного подключения с токеном  //
//  В конструкторе получаем baseUrl и заголовки запроса  //
export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    //  Обрабатываем ответ сервера и, если не ОК, выводим реджектим с ошибкой  //
    _handleServerResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ответа сервера: ${res.status}`);
    }

    //  Универсальный метод принимает урл и объект опций c хедерами  //
    _request(url, options) {
        return fetch(url, options).then(this._handleServerResponse)
    }

    //  Получаем данные профиля с сервера  //
    getProfile() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers    
        })
    }

    //  Получаем доступные карточки мест с сервера  //
    getCards() {
        return this._request(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers    
        })
    }

    //  Сохраняем измененные данные профиля на сервере методом PATCH  //
    setProfile(obj) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: obj.name,
                about: obj.about
            })
        })
    }

    //  Сохраняем измененный аватар профиля на сервере через  PATCH  //
    setAvatar(obj) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: obj.avatar
            })
        })
    }

    //  Помечаем, если у карточки были лайки  //
    changeLikeCardStatus(obj, variable) {
        return variable ? this.addLike(obj) : this.deleteLike(obj);
    }

    //  Сохраняем данные о лайках карточки на сервере через  PUT  //
    addLike(obj) {
        return this._request(`${this._baseUrl}/cards/${obj._id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
    }

    //  Удаляем лайк карточки с сервера через  DELETE  //
    deleteLike(obj) {
        return this._request(`${this._baseUrl}/cards/${obj._id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
    }

    //  Добавляем новую карточку на сервере через  POST  //
    addCard(obj) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        })
    }

    //  Удаляем карточку с сервера через  DELETE  //
    deleteCard(obj) {
        return this._request(`${this._baseUrl}/cards/${obj._id}`, {
            method: "DELETE",
            headers: this._headers
        })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '7a2b5691-9c91-496f-b370-fd3cc1ce7210',
        'Content-Type': 'application/json'
    }
});
  