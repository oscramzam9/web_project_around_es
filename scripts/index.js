////////////////////////////// Begin of imports ////////////////////////////////
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
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


// Create button variables
const editButton = document.querySelector(".profile__edit-button");


// Form input
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// New card
const addButton = document.querySelector(".profile__add-button");


const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

////////////////////////////// End of variable definition ///////////////////////////////

///////////////////////// Function implementation ////////////////////////

function handlePreviewImage(name, link) {
  imagePopup.open({ name, link });
}

function renderCard(data) {
  const card = new Card(data, "#card-template", handlePreviewImage);
  return card.generateCard();
}

function handleOpenAddModal() {
  newCardPopup.open();
}

function openEditProfile() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.description;
  profilePopup.open();
}

///////////////////////// End of Function implementation //////////////////

////////////////////// Special submitter functions /////////////////////////////////
function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({name: inputValues.name, description: inputValues.description});
  profilePopup.close();
}

function handleCardFormSubmit(inputValues) {
  const newCard = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  const cardElement = renderCard(newCard);
  cardSection.addItem(cardElement);

  newCardPopup.close();
}
/////////////////////// End of special submitter functions ///////////////////////////////

/////////////////// Object instances //////////////////////////
const profilePopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
const imagePopup = new PopupWithImage("#image-popup");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const profileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form")
);
const cardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form")
);

///////////////////// Definition of listeners /////////////////////////////
editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", handleOpenAddModal);
//////////////////// End of definition of listeners /////////////////////////

//////////////////// Main method caller ////////////////////////////
cardSection.renderItems();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
profileValidator.setEventListeners();
cardValidator.setEventListeners();
/////////////////// End of Main method caller /////////////////////////
