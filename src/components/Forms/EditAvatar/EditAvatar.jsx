import { useRef, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditAvatar([{onClose}]) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const inputValue = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: inputValue.current.value,
    });
    onClose();
  }

  useEffect(() => {
    if (inputValue.current) {
      inputValue.current.value = "";
    }
  }, []);

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="popup__show"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form__title">Editar Avatar</h2>
      <input
        className="form__input"
        id="input-avatar-url"
        name="avatar"
        placeholder="URL de la imagen"
        required
        type="url"
        ref={inputValue}
      />
      <span className="input-error input-avatar-error"></span>

      <button type="submit" className="form__submit">
        Guardar
      </button>
    </form>
  );
}
