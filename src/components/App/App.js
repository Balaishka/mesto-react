import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Button from "../Button/Button";
import ImagePopup from "../ImagePopup/ImagePopup";

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

  function closeAllPopups(setPopup) {
    setPopup(false);
  }

  return (
    <>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          isOpen={isEditProfilePopupOpen}
          onClose={() => closeAllPopups(setIsEditProfilePopupOpen)}
          children={
            <>
              <input
                type="text"
                id="name-input"
                className="form__text form__text_type_name"
                name="edit-name"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="form__text-error name-input-error"></span>
              <input
                type="text"
                id="about-input"
                className="form__text form__text_type_about"
                name="edit-about"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="form__text-error about-input-error"></span>
              <Button text="Сохранить" name="edit" />
            </>
          }
        />

        <PopupWithForm
          title="Новое место"
          name="add-photo"
          isOpen={isAddPlacePopupOpen}
          onClose={() => closeAllPopups(setIsAddPlacePopupOpen)}
          children={
            <>
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

              <Button text="Создать" name="add-photo" />
            </>
          }
        />

        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={() => closeAllPopups(setIsEditAvatarPopupOpen)}
          children={
            <>
              <input
                type="url"
                id="url-input"
                className="form__text form__text_type_link"
                name="edit-avatar-link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__text-error url-input-error"></span>

              <Button text="Сохранить" name="edit-avatar" />
            </>
          }
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-photo"
          isOpen={isDeleteCardPopupOpen}
          onClose={() => closeAllPopups(setIsDeleteCardPopupOpen)}
          children={
            <>
              <Button text="Да" name="delete-photo" />
            </>
          }
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={() => closeAllPopups(setIsImagePopupOpen)}
        />
      </div>
    </>
  );
}

export default App;
