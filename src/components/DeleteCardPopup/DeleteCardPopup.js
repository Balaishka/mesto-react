import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isLoading, cardId }) {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(cardId);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-photo"
      buttonText="Да"
      buttonTextLoading="Удаление..."
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
