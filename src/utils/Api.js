class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  // Базовый запрос без тела
  _fetch(way, methodName) {
    return fetch(`${this._url}${way}`, {
      method: methodName,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Запрос с телом
  _fetchWithBody(way, methodName, bodyContent) {
    return fetch(`${this._url}${way}`, {
      method: methodName,
      headers: this._headers,
      body: JSON.stringify(bodyContent),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Получаем массив всех карточек
  getAllCards() {
    return this._fetch("cards", "GET");
  }

  // Получаем лайки карточки
  getLikesCard(cardId) {
    return this._fetch(`cards/${cardId}`, "GET");
  }

  // Ставим лайк карточке
  addLikeCard(cardId) {
    return this._fetch(`cards/${cardId}/likes`, "PUT");
  }

  // Убираем лайк с карточки
  deleteLikeCard(cardId) {
    return this._fetch(`cards/${cardId}/likes`, "DELETE");
  }

  // Добавляем новую карточку
  addNewCard(newCard) {
    return this._fetchWithBody("cards", "POST", newCard);
  }

  // Удаляем свою карточку
  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, "DELETE");
  }

  // Получаем всю информацию о пользователе
  getAllUserInfo() {
    return this._fetch("users/me", "GET");
  }

  // Обновляем информацию пользователя
  setUserInfo(newUserInfo) {
    return this._fetchWithBody("users/me", "PATCH", newUserInfo);
  }

  // Обновляем аватар
  setUserAvatar(newAvatar) {
    return this._fetchWithBody("users/me/avatar", "PATCH", newAvatar);
  }

  // Получаем всю необходимую информацию для отрисовки страницы
  getAllNeededData() {
    return Promise.all([this.getAllUserInfo(), this.getAllCards()]);
  }
}

// Создаем класс апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    "content-type": "application/json",
    authorization: "fc4c8120-00e8-40b3-bbab-d69ed1e171f6",
  },
});

export default api;
