export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._owner = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setLikeState() {
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked
    );
  }

  deleteCard() {
    this._element.remove();
  }

  updateLike(cardData) {
    this._isLiked = cardData.isLiked;
    this._setLikeState();
  }

  _handleImagePreview() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

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
    this._setLikeState();

    if (this._owner !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }
}