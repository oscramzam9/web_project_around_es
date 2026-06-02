import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
