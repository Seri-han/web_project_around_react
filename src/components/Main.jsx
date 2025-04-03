import { useState } from "react";
import Popup from "./Popup/Popup";
import NewCard from "./Forms/NewCard/NewCard";
import EditProfile from "./Forms/EditProfile/EditProfile";
import EditAvatar from "./Forms/EditAvatar/EditAvatar";
import Card from './Card/Card';
import ImagePopup from './ImagePopup/ImagePopup';

import AddButton from '../images/addButton.png';
import EditBtnAvatar from '../images/edit_avatar.png';
import EditBtn from '../images/editButton.png';

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [cardsList ] = useState(cards);

  function handleOpenPopup(type, card = null) {
    if (type === 'image') {
      setPopup(<ImagePopup card={card} onClose={() => setPopup(null)} />);
    } else if (type === 'newCard') {
      setPopup(<NewCard onClose={() => setPopup(null)}/>);
    } else if (type === 'editProfile') {
      setPopup(<EditProfile onClose={() => setPopup(null)}/>);
    } else if (type === 'editAvatar') {
      setPopup(<EditAvatar onClose={() => setPopup(null)}/>);
    }
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src=" " alt="Avatar" />
          <button 
            className="profile__edit-avatar" 
            aria-label="Editar Avatar" 
            onClick={() => handleOpenPopup("editAvatar")}
          >
            <img src={EditBtnAvatar} alt="Botón para editar Avatar" />
          </button>
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <p className="profile__name">Sarah Handal</p>
            <p className="profile__hobbie">Web Designer</p>
          </div>
          <button 
            className="profile__edit-button" 
            aria-label="Editar perfil" 
            onClick={() => handleOpenPopup("editProfile")}
          >
            <img src={EditBtn} alt="Botón para editar perfil" />
          </button>
        </div>
        <button 
          className="profile__add-button" 
          aria-label="Agregar nueva imagen" 
          onClick={() => handleOpenPopup("newCard")}
        >
          <img src={AddButton} alt="Botón para agregar nueva imagen" />
        </button>
      </section>
      <div className="elements__container">
        {cardsList.map((card) => (
          <Card key={card._id} card={card} onImageClick={() => handleOpenPopup('image', card)} />
        ))}
      </div>

      {popup && (
        <div className="popup__overlay">
          <div className="popup__content">
            <button className="popup__close" onClick={handleClosePopup} aria-label="Cerrar popup">X</button>
            {popup}
          </div>
        </div>
      )}
    </main>
  );
}
