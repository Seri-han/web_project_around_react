// import { useState } from 'react'
import React, {useState} from 'react';
// import {api } from '../utils/api.js'
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";



function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });


  

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main setCurrentUser={setCurrentUser} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;