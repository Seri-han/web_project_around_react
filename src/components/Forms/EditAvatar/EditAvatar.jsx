export default function EditAvatar() {
    return (
      <form className="popup__form" name="edit-avatar-form" noValidate>
        <label className="popup__field">
          <input
            className="popup__input"
            id="avatar-link"
            name="avatar"
            placeholder="URL de la imagen"
            required
            type="url"
          />
          <span className="popup__error" id="avatar-link-error"></span>
        </label>
        <button className="button popup__button" type="submit">Guardar</button>
      </form>
    );
  }