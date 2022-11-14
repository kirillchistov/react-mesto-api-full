import { useState, useCallback } from 'react';

//  Функция для получения состояния - значения, статус валидации и ошибки  //
export const useFormAndValidation = (validity) => {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  //  Обрабатываем изменения в инпутах - значения, ошибки, статус валидности  //
  const handleChange = (e) => {
    const { name, value  } = e.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const isFormToValidate = e.target.closest('.popup__form');
    !!isFormToValidate && isFormToValidate.checkValidity();
  };

  //  Очищаем форму передаем в аргументы значения по умолчанию и зависимости  //
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);
  return { values, setValues, handleChange, errors, setErrors, isValid, setIsValid, resetForm };
}