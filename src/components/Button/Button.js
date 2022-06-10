function Button({ name, text }) {
  return (
    <>
      <button
        type="submit"
        className={`form__btn form__btn_type_${name}`}
        aria-label={text}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
