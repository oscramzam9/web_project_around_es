////////////////////////////// Begin of imports ////////////////////////////////
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, handleEscClose } from "./utils.js";
///////////////////////////// End of imports ///////////////////////////////////

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

/////////////////////////  Function implementation    ////////////////////////


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
