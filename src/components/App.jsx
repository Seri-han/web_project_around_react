import React, { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


    //---------------------------- UPDATE USER ------------------------------//

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.error);
  };

  //---------------------------- POPUP ------------------------------//

  const [popup, setPopup] = useState(null);
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  //---------------------- AVATAR ---------------------------------

  const handleUpdateAvatar = (data) => {
    console.log(data);
  
    (async () => {
      await api.editAvatar(data).then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      });
    })().catch((err) => {
      console.error(`UPDATE ERROR - ${err}`);
    });
  };
  

  //---------------------- CARDS ---------------------------------
  const handleAddPlaceSubmit = (newCardData) => {
    api.addCard(newCardData)
      .then((newCard) => {
        const validatedNewCard = {
          ...newCard,
          likes: Array.isArray(newCard.likes) ? newCard.likes : [],
        };
        setCards([validatedNewCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error(`Error al añadir tarjeta: ${err}`));
  };
  

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

  async function handleCardLike(card) {
      const isLiked = Array.isArray(card.likes) && card.likes.some((i) => {
        const likeId = typeof i === 'object' ? i._id : i;
        return likeId === currentUser._id;
      });
      
      try {
        const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
        console.log("New card from server:", newCard);
        
        const updatedCard = {
          ...newCard,
          likes: !isLiked
            ? [...card.likes, { _id: currentUser._id }]
            : card.likes.filter((like) => {
                const likeId = typeof like === 'object' ? like._id : like;
                return likeId !== currentUser._id;
              }),
        };
        
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? updatedCard : currentCard
          )
        );
        
        
      } catch (error) {
        console.error(error);
      }
    }

    function handleCardDelete(card) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.error("Error al eliminar la card:", err));
    }


  
  //

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        {" "}
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          currentUser={currentUser} 
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceSubmit}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
