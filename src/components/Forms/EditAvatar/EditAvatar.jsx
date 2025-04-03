export default function EditAvatar() {
    return (
      <div className="popup__form" name="edit-avatar-form" id="popup__show" noValidate>
       <h2 class="form__title">Editar Avatar</h2>
          <input
            className="form__input"
            id="input-avatar-url"
            name="avatar"
            placeholder="URL de la imagen"
            required
            type="url"
          />
          <span className="input-error input-avatar-error"></span>
       
          <button type="submit" className="form__submit">Guardar</button>
      </div>
    );
  }