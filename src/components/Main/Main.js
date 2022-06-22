import React from "react";
import avatarEdit from "../../images/avatar-edit.svg";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    onCardLike(card);
  }

  function handleCardDelete(cardId) {
    onCardDelete(cardId);
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
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
