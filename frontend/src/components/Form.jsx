import React from 'react';

const Form = ({ title, buttonText, handleSubmit, handleChange, values, errors, isValid }) => {
  return (
    <form className="login__form form" onSubmit={handleSubmit} noValidate>
      <h2 className="login__form-title">{title}</h2>
      <div className="login__input-wrapper">
        <input
          className={`login__form-input
            ${errors.email ? 'popup__form-input_type_error' : ''}`}
          type="email"
          placeholder="Email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className={`popup__input-error ${errors.email ? 'login__input-error_active' : ''}`}>
          {errors.email}
        </span>

        <input
          className={`login__form-input
            ${errors.password ? 'popup__form-input_type_error' : ''}`}
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="5"
          maxLength="30"
          value={values.password || ''}
          onChange={handleChange}
        />
        <span
          className={`popup__input-error ${errors.password ? 'login__input-error_active' : ''}`}
        >
          {errors.password}
        </span>
      </div>
      <button className="login__form-button" type="submit" disabled={!isValid}>
        {buttonText}
      </button>
    </form>
  );
}

export default Form;