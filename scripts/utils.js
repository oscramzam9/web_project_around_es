export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}