const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button")

const popupProfileEdit = document.querySelector(".popup_profile-edit");
const formProfileEdit = popupProfileEdit.querySelector(".popup__container");
const profileEditNameField = popupProfileEdit.querySelector(".popup__input_type_name");
const profileEditOccupationField = popupProfileEdit.querySelector(".popup__input_type_occupation");
const profileEditSubmitButton = popupProfileEdit.querySelector(".popup__submit-button");

const popupAddCard = document.querySelector(".popup_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addCardTitleField = popupAddCard.querySelector(".popup__input_type_title");
const addCardLinkField = popupAddCard.querySelector(".popup__input_type_link");
const addCardSubmitButton = popupAddCard.querySelector(".popup__submit-button");

const popupImgPreview = document.querySelector(".popup_img-preview");
const imgPreviewLink = popupImgPreview.querySelector(".popup__preview-image");
const imgPreviewTitle = popupImgPreview.querySelector(".popup__preview-title");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const cardsSection = document.querySelector("section.elements");
const cardTemplate = document.querySelector(".cardTemplate").content;

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

function setLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function openCard(cardTitle, cardLink) {
  event.preventDefault();
  imgPreviewLink.attributes.src.value = cardLink;
  imgPreviewLink.attributes.alt.value = cardTitle;
  imgPreviewTitle.textContent = cardTitle;
  openPopup(popupImgPreview);
}

function deleteCard(evt) {
  const currentCard = evt.target.closest(".element");
  currentCard.remove();
}

function renderCard(card) {
  cardsSection.prepend(card);
}

function createCard(cardTitle, cardLink) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg = newCard.querySelector(".element__photo");
  const likeButton = newCard.querySelector(".element__like-button");
  const trashButton = newCard.querySelector(".element__trash-button");

  cardImg.src = cardLink;
  if (cardTitle === "") {
    cardImg.alt = "неизвестная фотография";
  }
  else {
    cardImg.alt = cardTitle;
  }

  newCard.querySelector(".element__title").textContent = cardTitle;

  newCard.querySelector(".element__link").addEventListener("click", () => openCard(cardTitle, cardLink));

  likeButton.addEventListener("click", setLike);
  trashButton.addEventListener("click", deleteCard);

  return newCard;
}

function addCard(evt) {
  evt.preventDefault();
  newCard = createCard(addCardTitleField.value, addCardLinkField.value);
  renderCard(newCard);
  closePopup(popupAddCard); 
}

function openAddCardPopup () {
  disableButton(addCardSubmitButton, "popup__submit-button_disabled");
  hideInputError(popupAddCard, addCardTitleField, "popup__input_type_error", "popup__error_visible");
  hideInputError(popupAddCard, addCardLinkField, "popup__input_type_error", "popup__error_visible");  
  formAddCard.reset();
  openPopup(popupAddCard);
}

function openEditProfilePopup() {
  profileEditNameField.value = profileName.textContent;
  profileEditOccupationField.value = profileOccupation.textContent;
  hideInputError(popupProfileEdit, profileEditOccupationField, "popup__input_type_error", "popup__error_visible");
  hideInputError(popupProfileEdit, profileEditNameField, "popup__input_type_error", "popup__error_visible");
  enableButton(profileEditSubmitButton, "popup__submit-button_disabled");
  openPopup(popupProfileEdit);
}

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameField.value;
  profileOccupation.textContent = profileEditOccupationField.value;
  closePopup(popupProfileEdit);
}

function initElements() {
  //initialCards - массив для первоначального заполнения на странице, объявлен в файле initialCards.js
  initialCards.reverse();

  initialCards.forEach(card => {
    newCard = createCard(card.name, card.link);
    renderCard(newCard);
  });
}

buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);

formProfileEdit.addEventListener('submit', updateProfile);
formAddCard.addEventListener('submit', addCard);

//назначим всем кнопкам закрытия попапов функцию
const popupList = document.querySelectorAll(".popup");
for (i = 0; i < popupList.length; i++) {
  const popup = popupList[i];
  popupList.forEach( popup => {
    popup.addEventListener('mousedown', (evt) => { 
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close-button')) { 
        closePopup(popup); 
      }; 
    }); 
  });  
}

initElements();
