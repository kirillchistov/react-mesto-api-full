import React, {useContext, useEffect} from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {
    const {values, setValues, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

    //  Подписываемся на контекст  //
    const currentUser = useContext(CurrentUserContext);

    //  Cоздаем эффект для обновления стейта при изменении контекста  // 
    useEffect(() => {
        if (isOpen && currentUser.name && currentUser.about) {
            setValues({name: currentUser.name, about: currentUser.about});
        }
        setIsValid(false)
    }, [isOpen, currentUser.name, currentUser.about, setIsValid, setValues])

    //  Обрабатываем сохранение профиля (сабмит)  //
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(values);  //
        onUpdateUser({
        });
    };

    return (
        <PopupWithForm
            name={'profile'}
            isOpen={isOpen}
            isValid={isValid}
            onClose={onClose}
            title={'Редактировать профиль'}
            buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset" id="fieldsetProfileEdit">
            <label className="fpopup__label">
                <input 
                    className={`popup__input popup__input_user_name ${errors.name ? 'popup__field-error_type' : ''}`}
                    type="text" 
                    name="name" 
                    id="profile-name" 
                    placeholder="Введите имя пользователя" 
                    required
                    autoComplete="off"
                    minLength="1" 
                    maxLength="40" 
                    value={values["name"] || ''} 
                    onChange={handleChange} 
                />
                <span 
                  className={`popup__field-error profile-name-error 
                    ${ !isValid && 'popup__field-error_active' }`}
                >{errors["name"]}</span>
            </label>
            <label className="popup__label">
                <input 
                    className={`popup__input popup__input_user_job" ${errors.link ? 'popup__field-error_type' : ''}`} 
                    type="text"
                    name="about" 
                    id="profile-job" 
                    placeholder="Профессия"
                    required
                    autoComplete="off"
                    minLength="2" 
                    maxLength="200" 
                    value={values["about"] || ''} 
                    onChange={handleChange} 
                />
                <span 
                    className={`popup__field-error profile-job-error" 
                        ${!isValid && 'popup__field-error_active'}`}
                >{errors["about"]}</span>
            </label>
            </fieldset>
        </PopupWithForm>
    );
};

export default EditProfilePopup;