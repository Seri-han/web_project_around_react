import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import React, { useContext } from "react";

export default function Card({
  card,
  onImageClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);
  const ownerId = typeof card.owner === 'object' ? card.owner._id : card.owner;
const isOwn = ownerId === currentUser._id;


const isLiked = Array.isArray(card.likes)
  ? card.likes.some((i) => i._id === currentUser._id)
  : false;



  const cardLikeButtonClassName = `element__photo-like ${
    isLiked ? 'element__photo-like_active' : ''
  }`;

  function handleCardLike () {
    onCardLike(card);
  }
  
  function handleCardDelete () {
    onCardDelete(card);
  }
  

  return (
    <li className="element">
      {isOwn && (
        <button
          aria-label="Delete card"
          className="element__photo-trash"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <img
        className="element__photo-link"
        src={card.link}
        alt={card.name}
        onClick={() => onImageClick(card)}
      />
      <div className="element__info">
        <h2 className="element__photo-name">{card.name}</h2>
        <button
          aria-label="Dar like a la tarjeta"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleCardLike}
        />
        <span>{Array.isArray(card.likes) ? card.likes.length : 0}</span>
      </div>
    </li>
  );
}
