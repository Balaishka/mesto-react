import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import DeleteCardPopup from "../DeleteCardPopup/DeleteCardPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [cardIdForDelete, setCardIdForDelete] = useState("");

  // Получаем все карточки
  useEffect(() => {
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  // Получаем всю информацию о пользователе
  useEffect(() => {
    api
      .getAllUserInfo()
      .then((data) => {
        return setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  // Обновляем информацию о пользователе
  function handleUpdateUser(newUserInfo) {

    setIsLoading(true);

    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        return closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  // Обновляем аватар
  function handleUpdateAvatar(newAvatar) {

    setIsLoading(true);

    api
      .setUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        return closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  // Ставим или удаляем лайк карточке
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });

  }

  // Открываем попап удаления своей карточки
  function handleCardDelete(cardId) {
    setIsDeleteCardPopupOpen(true);
    setCardIdForDelete(cardId);
  }

  // Удаляем свою карточку
  function handleDeleteCard(cardId) {

    setIsLoading(true);

    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        return closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }

  // Добавляем новую карточку
  function handleAddPlaceSubmit(newCard) {

    setIsLoading(true);

    api
      .addNewCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        return closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          isLoading={isLoading}
          cardId={cardIdForDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
