import React, { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        console.log("Datos del usuario:", userData);
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, []);

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
  

  //

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        {" "}
        <Header />
        <Main
          // setCurrentUser={setCurrentUser}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
