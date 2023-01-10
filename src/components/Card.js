import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="card__name">{card.name}</h2>
      {isOwn && <button className="card__delete"  />}
      
      <button className="card__heart" type="button">
        <p className="card__likes">{card.likes.length}</p>
      </button>
    </div>
  );
}

export default Card;
