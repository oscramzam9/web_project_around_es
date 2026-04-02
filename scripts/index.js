////////////////////////////// Variable definition ///////////////////////////////
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//modals
const modalProfile = document.querySelector("#edit-popup");
const modalNewCard = document.querySelector("#new-card-popup");
const modalImage = document.querySelector("#image-popup");

//Container
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

//Create button variables.
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

//User Data
const profileForm = document.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//Form input
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//New card
const addButton = document.querySelector(".profile__add-button");
const closeNewCardButton = modalNewCard.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

//Image preview image
const modalImageElement = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");
const closeImageButton = modalImage.querySelector(".popup__close");

//Popups
const popups = Array.from(document.querySelectorAll(".popup"));

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

////////////////////////////// End of variable definition ///////////////////////////////

/////////////////////////////  Class definition /////////////////////////
class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImagePreview() {
    this._handleImageClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick()
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );

    this._image.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._config.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._config.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // 🔹 Método público
  setEventListeners() {
    this._setEventListeners();
  }
}

/////////////////////////////  End of class definition //////////////////

/////////////////////////  Function implementation    ////////////////////////

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  //Query Selector for likeButton
  const likeButton = cardElement.querySelector(".card__like-button");
  //Query Selector for deleteButton
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  //////////////////////////// Functional listeners ///////////////////////
  //Implements like toggle heart
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  //Implements removal of card
  deleteButton.addEventListener("click", function () {
    deleteButton.closest(".card").remove();
  });

  //Implement pop up card
  cardImage.addEventListener("click", () => handlePreviewImage(name, link));
  /////////////////////////// End of functional listeners //////////////////
  return cardElement;
}

function handlePreviewImage(name, link) {
  modalImageCaption.textContent = name;
  modalImageElement.src = link;
  modalImageElement.alt = name;
  openModal(modalImage);
}

function renderCard(data, container) {
  const card = new Card(
    data,
    "#card-template",
    handlePreviewImage
  );

  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleOpenAddModal() {
  newCardForm.reset();
  openModal(modalNewCard);
}
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editPopup);
}

function closeEditProfile() {
  closeModal(editPopup);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid,
  );

  if (hasInvalidInput) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

/////////////////////////  End of Function implementation    ////////////////

//////////////////////   Special submitter functions /////////////////////////////////
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCard, cardsContainer);
  closeModal(modalNewCard);
  newCardForm.reset();
}
/////////////////////// End of special submitter functions ///////////////////////////////

/////////////////////   Definition of listeners  /////////////////////////////
editButton.addEventListener("click", openEditProfile);
closeButton.addEventListener("click", closeEditProfile);
profileForm.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", handleOpenAddModal);
newCardForm.addEventListener("submit", handleCardFormSubmit);
closeNewCardButton.addEventListener("click", () => closeModal(modalNewCard));
closeImageButton.addEventListener("click", () => closeModal(modalImage));
document.addEventListener("keydown", handleEscClose);
////////////////////   End of definition of listeners /////////////////////////

////////////////////    Main method caller and principal objects  ////////////////////////////
initialCards.forEach(function (card) {
  renderCard(card, cardsContainer);
});

const profileValidator = new FormValidator(
  validationConfig,
  profileForm
);
profileValidator.setEventListeners();

const cardValidator = new FormValidator(
  validationConfig,
  newCardForm
);
cardValidator.setEventListeners();
///////////////////      End of Main method caller /////////////////////////
