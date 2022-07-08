import { initialCards, cardConfig, validatorConfig } from "./config.js";

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button")

const popupProfileEdit = document.querySelector(".popup_profile-edit");
const formProfileEdit = popupProfileEdit.querySelector(".popup__form");
const profileEditNameField = popupProfileEdit.querySelector(".popup__input_type_name");
const profileEditOccupationField = popupProfileEdit.querySelector(".popup__input_type_occupation");

const popupAddCard = document.querySelector(".popup_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addCardTitleField = popupAddCard.querySelector(".popup__input_type_title");
const addCardLinkField = popupAddCard.querySelector(".popup__input_type_link");

const popupImgPreview = document.querySelector(".popup_img-preview");
const imgPreviewLink = popupImgPreview.querySelector(".popup__preview-image");
const imgPreviewTitle = popupImgPreview.querySelector(".popup__preview-title");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const cardsSection = document.querySelector("section.elements");

const validators = {};

const documentEscKeyHandler = function (evt) {
  if (evt.key == "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", documentEscKeyHandler);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", documentEscKeyHandler);
}

function openCard(cardTitle, cardLink) {
  imgPreviewLink.attributes.src.value = cardLink;
  imgPreviewLink.attributes.alt.value = cardTitle;
  imgPreviewTitle.textContent = cardTitle;
  openPopup(popupImgPreview);
}

function renderCard(card) {
  cardsSection.prepend(card);
}

function createCard(cardData) {
  return new Card(cardData, openCard, cardConfig).createCard();
}

function addCard(evt) {
  evt.preventDefault();

  const cardData = {
    cardTitle: addCardTitleField.value,
    cardLink: addCardLinkField.value
  };

  const newCard = createCard(cardData);
  renderCard(newCard);
  closePopup(popupAddCard);
}

function openAddCardPopup() {
  formAddCard.reset();
  validators[formAddCard.name].resetValidation(true);
  openPopup(popupAddCard);
}

function openEditProfilePopup() {
  validators[formProfileEdit.name].resetValidation(false);
  profileEditNameField.value = profileName.textContent;
  profileEditOccupationField.value = profileOccupation.textContent;
  openPopup(popupProfileEdit);
}

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameField.value;
  profileOccupation.textContent = profileEditOccupationField.value;
  closePopup(popupProfileEdit);
}

function initElements() {
  initialCards.reverse();
  initialCards.forEach(card => {
    const cardData = {
      cardTitle: card.name,
      cardLink: card.link
    };
    renderCard(createCard(cardData));
  });
}

buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);

formProfileEdit.addEventListener('submit', updateProfile);
formAddCard.addEventListener('submit', addCard);

//назначим всем кнопкам закрытия попапов функцию
const popupList = document.querySelectorAll(".popup");
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
});

const formList = Array.from(document.querySelectorAll(validatorConfig.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validatorConfig, formElement);
  formValidator.enableValidation();
  validators[formElement.name] = formValidator;
});

initElements();
