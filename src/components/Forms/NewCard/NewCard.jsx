export default function NewCard() {
    return (
      <div className="popup" id="popup__show">
       <form className="form popup__form" id="form-addCard" noValidate>
       <h2 className="form__title">Nuevo Lugar</h2>
          <input
            className="form__input"
            type="text"
            id="input-card-name"
            placeholder="Titulo"
            minLength="2"
            maxLength="30"
            name="name"
            required
          />
         <span className="input-error input-card-name-error"></span>
        
      
          <input
             className="form__input"
            id="input-card-link"
            name="link"
            placeholder="Enlace de la imagen"
            required
            type="url"
          />
          <span className="input-error input-card-link-error"></span>
       
          <button type="submit" className="form__submit" disabled>Crear</button>
        </form>
      </div>
    );
  }
  