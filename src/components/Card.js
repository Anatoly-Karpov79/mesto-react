function Card({ card, onCardClick }) {
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
      <button className="card__delete" type="button"></button>
      <button className="card__heart" type="button">
        <p className="card__likes">{card.likes.length}</p>
      </button>
    </div>
  );
}

export default Card;
