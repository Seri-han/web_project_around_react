export default function Card({ card }) {
    const { name, link, isLiked } = card;
    
    return (
      <li className="element">
        <button
          aria-label="Delete card"
          className="element__photo-trash"
          type="button"
        />
        <img className="element__photo-link" src={link} alt={name} />
        <div className="element__info">
          <h2 className="element__photo-name">{name}</h2>
          <button
            aria-label="Like card"
            type="button"
            className={`element__photo-like ${isLiked ? 'element__photo-like_active' : ''}`}
          />
        </div>
      </li>
    );
  }
  