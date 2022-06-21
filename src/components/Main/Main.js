import React from "react";
import avatarEdit from "../../images/avatar-edit.svg";
import api from "../../utils/Api";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  
  const { currentUser } = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
    .then(() => {
      return setCards(cards.filter(card => card._id !== cardId));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    });
  }

  return (
    <main className="content">
      <section className="content__block profile">
        <div className="profile__info">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img
              src={avatarEdit}
              alt="Редактировать аватар"
              className="profile__avatar-edit"
            />
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar-img"
            />
          </div>
          <div className="profile__content">
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                aria-label="Редактировать"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="photos">
        <ul className="photos__list">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
