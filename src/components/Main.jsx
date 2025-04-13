import { useState, useEffect, useContext } from "react";
import Popup from "./Popup/Popup";
import NewCard from "./Forms/NewCard/NewCard";
import EditProfile from "./Forms/EditProfile/EditProfile";
import EditAvatar from "./Forms/EditAvatar/EditAvatar";
import Card from "./Card/Card";
import ImagePopup from "./ImagePopup/ImagePopup";
import AddButton from "../images/addButton.png";
import EditBtnAvatar from "../images/edit_avatar.png";
import EditBtn from "../images/editButton.png";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({ setCurrentUser }) {

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  // const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);

    api.getInitialCards().then((cards) => {
      const validatedCards = cards.map(card => ({
        ...card,
        likes: Array.isArray(card.likes) ? card.likes : [],
      }));
      setCards(validatedCards);
    }).catch(console.error);
  }, [setCurrentUser]);

  function handleOpenPopup(type, card = null) {
    if (type === "image") {
      setPopup(<ImagePopup card={card} onClose={() => setPopup(null)} />);
    } else if (type === "newCard") {
      setPopup(<NewCard onClose={() => setPopup(null)} />);
    } else if (type === "editProfile") {
      setPopup(<EditProfile onClose={() => setPopup(null)} />);
    } else if (type === "editAvatar") {
      setPopup(<EditAvatar onClose={() => setPopup(null)} />);
    }
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleCardLike(card) {
    const isLiked = Array.isArray(card.likes) && card.likes.some((i) => {
      const likeId = typeof i === 'object' ? i._id : i;
      return likeId === currentUser._id;
    });
    
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      console.log("New card from server:", newCard);
      
      let updatedCard = newCard;
      if (!Array.isArray(newCard.likes) || newCard.likes.length === 0) {
        updatedCard = {
          ...newCard,
          likes: isLiked
            ? card.likes.filter((like) => {
                const likeId = typeof like === 'object' ? like._id : like;
                return likeId !== currentUser._id;
              })
            : [...card.likes, { _id: currentUser._id }],
        };
      }
      
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    console.log("Desde Main.jsx: currentUser", currentUser);
  }, [currentUser]);
  
  

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Error al eliminar la card:", err));
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={`${currentUser.avatar}?${new Date().getTime()}`}

              alt="Avatar"
              
              // onClick={() => onOpenPopup(editAvatarPopup)}
            />
         
          <button
            className="profile__edit-avatar"
            aria-label="Editar Avatar"
            onClick={() => handleOpenPopup("editAvatar")}
          >
            <img src={EditBtnAvatar} alt="Editar Avatar" />
          </button>
        </div>
        <div className="profile__content">
          <div className="profile__info">
          {currentUser.name ? (
      <>
        <p className="profile__name">{currentUser.name}</p>
        <p className="profile__hobbie">{currentUser.about}</p>
      </>
    ) : (
      <p>Cargando perfil...</p>
    )}
          </div>
          <button
            className="profile__edit-button"
            aria-label="Editar perfil"
            onClick={() => handleOpenPopup("editProfile")}
          >
            <img src={EditBtn} alt="Editar perfil" />
          </button>
        </div>
        <button
          className="profile__add-button"
          aria-label="Agregar nueva imagen"
          onClick={() => handleOpenPopup("newCard")}
        >
          <img src={AddButton} alt="Agregar imagen" />
        </button>
      </section>

      <ul className="elements__container">
      {cards.map((card) => {
  console.log("Card data:", card);
  return (
    <Card
      key={card._id}
      card={card}
      onImageClick={() => handleOpenPopup("image", card)}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    />
  );
})}
      </ul>

      {popup && (
        <div className="popup__overlay">
          <div className="popup__content">
            <button
              className="popup__close"
              onClick={handleClosePopup}
              aria-label="Cerrar popup"
            >
              X
            </button>
            {popup}
          </div>
        </div>
      )}
    </main>
  );
}