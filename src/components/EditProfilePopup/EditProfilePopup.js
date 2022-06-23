import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const { currentUser } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      buttonTextLoading="Сохранение..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        className="form__text form__text_type_name"
        name="edit-name"
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__text-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
