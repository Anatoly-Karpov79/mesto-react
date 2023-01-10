import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/Api";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
const [currentUser, setCurrentUser] = useState({});
const [cards, setCards] = useState([]);


useEffect(() => {
  api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
useEffect(() => {
  api.getInitialCards()
    .then((initialCards) => {
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatar(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatar(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        cards={cards}
      />

      <Footer />
      <PopupWithForm
        name={"popup_edit"}
        isOpen={isEditProfilePopupOpen}
        title={"Редактировать профиль"}
        onClose={closeAllPopups}
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

      <PopupWithForm
        name={"popup_avatar"}
        isOpen={isEditAvatar}
        title={"Обновить аватар"}
        onClose={closeAllPopups}
        btnText={"Сохранить"}
      >
        <fieldset className="form__set">
          <input
            type="url"
            className="popup__input popup__input_avatar_link"
            id="url-avatar"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="form__input-error popup__input-error url-avatar-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name={"popup_add"}
        isOpen={isAddPlacePopupOpen}
        title={"Новое место"}
        onClose={closeAllPopups}
        btnText={"Создать"}
      >
        <fieldset className="form__set">
          <input
            type="text"
            className="popup__input popup__input_add_name"
            id="discr-input"
            placeholder="Название"
            name="name"
            required
            minLength={2}
            maxLength={30}
          />
          <span className="form__input-error popup__input-error discr-input-error" />
          <input
            type="url"
            className="popup__input popup__input_add_link"
            id="url-input"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="form__input-error popup__input-error url-input-error" />
        </fieldset>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/*Попап подтверждения удаления */}
      <div className="popup popup_confirm">
        <div className="popup__container">
          <button
            aria-label="Close"
            type="button"
            className="popup__close-popup popup__confirm-close popup__button-close"
          />
          <h3 className="popup__heading">Вы уверены?</h3>
          <form
            name="form__confirm"
            className="form popup__form"
            id="form__confirm"
            noValidate
          >
            <button
              type="submit"
              className="popup__button"
              id="popup__button-confirm"
            >
              Да
            </button>
          </form>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
