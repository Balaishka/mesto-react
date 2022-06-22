import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = isLiked ? "photo__like-btn_active" : "";

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card._id);
  }

  return (
    <li className="photo">
      <img
        src={card.link}
        alt={card.name}
        className="photo__img"
        onClick={handleCardClick}
      />
      <div className="photo__info">
        <h2 className="photo__name">{card.name}</h2>
        <div className="photo__like">
          <button
            type="button"
            className={`photo__like-btn ${cardLikeButtonClassName}`}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="photo__likes">{card.likes.length}</p>
        </div>
      </div>
      {isOwn ? (
        <button
          type="button"
          className="photo__delete-btn"
          aria-label="Удалить"
          onClick={handleCardDelete}
        ></button>
      ) : (
        ""
      )}
    </li>
  );
}

export default Card;
