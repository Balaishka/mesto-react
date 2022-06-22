import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText="Сохранить"
      buttonTextLoading="Сохранение..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="url"
        id="url-input"
        className="form__text form__text_type_link"
        name="edit-avatar-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__text-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
