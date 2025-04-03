export default function EditProfile() {
  return (
    <div className="popup" id="popup__show">
      <form className="form popup__form" id="form-avatar" noValidate>
      <h2 class="form__title">Editar perfil</h2>
        <input
          className="form__input"
          id="input-name"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          minLength="2"
          maxLength="40"
          
        />
       <span className="input-error input-name-error"></span>

        <input
          className="form__input"
          id="input-hobbie"
          name="about"
          placeholder="Acerca de mí"
          required
          type="text"
          minLength="2"
          maxLength="200"
          
        />
        <span className="input-error input-hobbie-error"></span>

        <button type="submit" className="form__submit" disabled>Guardar</button>
      </form>
    </div>
  );
}
