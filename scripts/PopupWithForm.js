import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}