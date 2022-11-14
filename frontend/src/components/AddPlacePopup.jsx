//  Отдельный компонент для добавления карточки места  //
//  Импортируем компоненты и состояния, контекст?  //

import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

//  Создаем стейты названия и ссылки на картинку места  //
const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    //  Добавляем обработчики изменения инпутов и отправки формы  //

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    //  Возвращаем JSX попапа с новыми пропсами  //

    return (
        <PopupWithForm title="Новое место" name="add-place" buttonText="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <fieldset className="popup__fieldset" id="fieldsetAddPlace">
                <label className="popup__label">
                    <input className="popup__input popup__input_place_name" type="text"    
                    id="new-card-title" name="name" placeholder="Название места" 
                    required minLength="2" maxLength="30" value={name} onChange={handleNameChange} />
                    <span className="popup__field-error new-card-title-error"></span>
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_place_link" type="url" 
                        value={link} onChange={handleLinkChange}
                        id="new-card-source" name="link" placeholder="Ссылка на иллюстрацию" required />
                    <span className="popup__field-error new-card-source-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
};

export default AddPlacePopup;