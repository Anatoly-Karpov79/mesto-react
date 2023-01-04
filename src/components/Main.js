import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUsername] = useState("Имя");
  const [userDescription, setUserDescription] = useState("Профессия");
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, initialCards]) => {
      setUsername(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      setCards(initialCards);
    });
  },[]);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={userAvatar}
            alt="Ваша ава"
            name="avatar"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          aria-label="Add"
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        {cards.map((card, _id) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
            ></Card>
          );
        })}
      </section>
    </>
  );
}

export default Main;
