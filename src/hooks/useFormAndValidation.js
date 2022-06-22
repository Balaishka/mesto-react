import React from "react";

function useFormAndValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...values, [name]: e.target.vallidationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
