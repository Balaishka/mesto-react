import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleChangeName(e) {
    setCardName(e.target.value);
  }

  function handleChangeLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-photo"
      buttonText="Создать"
      buttonTextLoading="Создание..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title-input"
        className="form__text form__text_type_title"
        name="add-photo-title"
        placeholder="Название"
        value={cardName}
        onChange={handleChangeName}
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
        value={cardLink}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__text-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
