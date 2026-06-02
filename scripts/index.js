////////////////////////////// Begin of imports ////////////////////////////////
import Api from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
///////////////////////////// End of imports ///////////////////////////////////

////////////////////////////// Variable definition ///////////////////////////////
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

let currentUserId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "bba42bcf-9b3b-46b8-b9bc-ec3c87f85e9c",
    "Content-Type": "application/json",
  },
});
////////////////////////////// End of variable definition ///////////////////////////////

///////////////////////// Function implementation ////////////////////////
function handlePreviewImage(name, link) {
  imagePopup.open({ name, link });
}

function handleDeleteCard(card) {
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
  deleteCardPopup.open();
}

function handleLikeCard(card) {
  const likeRequest = card.isLiked()
    ? api.removeLike(card.getId())
    : api.addLike(card.getId());

  likeRequest
    .then((cardData) => {
      card.updateLike(cardData);
    })
    .catch((err) => console.log(err));
}

function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handlePreviewImage,
    handleDeleteCard,
    handleLikeCard,
    currentUserId
  );
  return card.generateCard();
}

function handleOpenAddModal() {
  cardValidator.resetValidation();
  newCardPopup.open();
}

function openEditProfile() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.description;
  profileValidator.resetValidation();
  profilePopup.open();
}

function openAvatarPopup() {
  avatarValidator.resetValidation();
  avatarPopup.open();
}
///////////////////////// End of Function implementation //////////////////

////////////////////// Special submitter functions /////////////////////////////////
function handleProfileFormSubmit(inputValues) {
  profilePopup.renderLoading(true);
  api
    .editUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

function handleCardFormSubmit(inputValues) {
  newCardPopup.renderLoading(true, "Creando...");
  api
    .addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    })
    .then((cardData) => {
      const cardElement = renderCard(cardData);
      cardSection.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(inputValues) {
  avatarPopup.renderLoading(true);
  api
    .editAvatar({
      avatar: inputValues.avatar,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}
/////////////////////// End of special submitter functions ///////////////////////////////

/////////////////// Object instances //////////////////////////
const profilePopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
const imagePopup = new PopupWithImage("#image-popup");
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const cardSection = new Section(
  {
    items: [],
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
const avatarValidator = new FormValidator(
  validationConfig,
  document.querySelector("#avatar-form")
);
/////////////////// End of object instances //////////////////////////

///////////////////// Definition of listeners /////////////////////////////
editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", handleOpenAddModal);
avatarButton.addEventListener("click", openAvatarPopup);
//////////////////// End of definition of listeners /////////////////////////

//////////////////// Main method caller ////////////////////////////
api
  .getAppInfo()
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(err));

profilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
profileValidator.setEventListeners();
cardValidator.setEventListeners();
avatarValidator.setEventListeners();
/////////////////// End of Main method caller /////////////////////////
