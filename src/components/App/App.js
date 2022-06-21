import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''});

  React.useEffect(() => {
    api.getAllUserInfo()
    .then((data) => {
      return setCurrentUser({name: data.name, about: data.about, avatar: data.avatar, _id: data._id});
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

  function handleUpdateUser(newUserInfo) {
    api.setUserInfo(newUserInfo)
    .then((data) => {
      setCurrentUser({name: data.name, about: data.about, avatar: data.avatar, _id: data._id});
      return closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    });
  }

  return (
    <CurrentUserContext.Provider value={{currentUser}} >
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <PopupWithForm
          title="Новое место"
          name="add-photo"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            id="title-input"
            className="form__text form__text_type_title"
            name="add-photo-title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__text-error title-input-error"></span>
          <input
            type="url"
            id="link-input"
            className="form__text form__text_type_link"
            name="add-photo-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__text-error link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            id="url-input"
            className="form__text form__text_type_link"
            name="edit-avatar-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__text-error url-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="delete-photo"
          buttonText="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
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
