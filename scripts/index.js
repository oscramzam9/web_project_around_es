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
////////////////////////////// End of variable definition ///////////////////////////////

/////////////////////////  Function implementation    ////////////////////////

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function getCardElement(name, link) {
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
  /////////////////////////// End of functional listeners //////////////////
  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

function handleOpenAddModal() {
  newCardForm.reset();
  const inputList = Array.from(newCardForm.querySelectorAll(".popup__input"));
  const buttonElement = newCardForm.querySelector(".popup__button");

  openModal(modalNewCard);
}
function openEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editPopup);
}
editButton.addEventListener("click", openEditProfile);

function closeEditProfile() {
  closeModal(editPopup);
}
/////////////////////////  End of Function implementation    ////////////////

//////////////////////   Special submitter functions /////////////////////////////////
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handleCardFormSubmit(evt) {
  debugger;
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard(name, link, cardsContainer);
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
////////////////////   End of definition of listeners /////////////////////////

////////////////////    Main method caller   ////////////////////////////
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});
///////////////////      End of Main method caller /////////////////////////
