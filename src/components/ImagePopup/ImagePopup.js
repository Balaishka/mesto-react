function ImagePopup({ card, isOpen, onClose }) {
  return (
    <>
      <div
        className={`popup popup_type_dark popup_name_picture ${
          isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container popup__container_name_picture">
          <button
            type="button"
            className="popup__close-btn popup__close-btn_name_picture"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <img src={card.link} alt={card.name} className="popup__picture" />
          <h3 className="popup__picture-title">{card.name}</h3>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
