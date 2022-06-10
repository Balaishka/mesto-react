import React from "react";
import avatarEdit from "../../images/avatar-edit.svg";
import api from "../../utils/Api";
import Card from "../Card/Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAllNeededData()
      .then((data) => {
        const [dataUser, dataCards] = data;

        // Получаем от сервера информацию о пользователе
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);

        setCards(dataCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  return (
    <>
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
                src={userAvatar}
                alt="Аватар"
                className="profile__avatar-img"
              />
            </div>
            <div className="profile__content">
              <div className="profile__edit">
                <h1 className="profile__name">{userName}</h1>
                <button
                  type="button"
                  className="profile__edit-btn"
                  aria-label="Редактировать"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__about">{userDescription}</p>
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
              <Card card={card} key={card._id} onCardClick={onCardClick} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
