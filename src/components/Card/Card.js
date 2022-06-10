function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
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
            className="photo__like-btn"
            aria-label="Нравится"
          ></button>
          <p className="photo__likes">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className="photo__delete-btn"
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;
