function PopupWithForm({ name, title, children, isOpen, onClose }) {
  return (
    <>
      <div
        className={`popup popup_name_${name} ${isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <button
            type="button"
            className={`popup__close-btn popup__close-btn_name_${name}`}
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <h3 className="popup__title">{title}</h3>
          <form
            className={`form form_${name}`}
            name={`${name}-form`}
            noValidate
          >
            {children}
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
