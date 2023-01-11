import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({isOpen, onClose}) {
    return (
        <PopupWithForm
        name={"popup_edit"}
        isOpen={isOpen}
        title={"Редактировать профиль"}
        onClose={onClose}
        btnText={"Сохранить"}
      >
        <fieldset className="form__set">
          <input
            type="text"
            className="popup__input popup__input_type_name"
            defaultValue
            id="name-input"
            placeholder="Имя"
            name="name"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="form__input-error popup__input-error name-input-error" />
          <input
            type="text"
            className="popup__input popup__input_type_about"
            defaultValue
            id="about-input"
            placeholder="Профессия"
            name="about"
            required
            minLength={2}
            maxLength={200}
          />
          <span className="form__input-error popup__input-error about-input-error" />
        </fieldset>
      </PopupWithForm>
    )
}

export default EditProfilePopup;