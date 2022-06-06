const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button")
const closeButton = document.querySelector(".popup__close-button");

const popupProfileEdit = document.querySelector(".popup_profile-edit");
const formProfileEdit = popupProfileEdit.querySelector(".popup__container");
const profileEditNameField = popupProfileEdit.querySelector(".popup__input_type_name");
const profileEditOccupationField = popupProfileEdit.querySelector(".popup__input_type_occupation");

const popupAddCard = document.querySelector(".popup_add-card");
const formAddCard = popupAddCard.querySelector(".popup__container");
const addCardTitleField = popupAddCard.querySelector(".popup__input_type_title");
const addCardLinkField = popupAddCard.querySelector(".popup__input_type_link");

const popupImgPreview = document.querySelector(".popup_img-preview");
const imgPreviewLink = popupImgPreview.querySelector(".popup__preview-image");
const imgPreviewTitle = popupImgPreview.querySelector(".popup__preview-title");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const cardsSection = document.querySelector("section.elements");
const cardTemplate = document.querySelector(".cardTemplate").content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function deleteCard (evt) {
  const currentCard = evt.target.closest('.element');
  currentCard.remove();
}

function renderCard (Card) {
  cardsSection.prepend(Card);
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

  newCard.querySelector(".element__link").addEventListener('click', () => openCard(cardTitle, cardLink));

  likeButton.addEventListener('click', setLike);
  trashButton.addEventListener('click', deleteCard);
  renderCard(newCard);
}

function addCard(evt) {
  evt.preventDefault();
  createCard(addCardTitleField.value, addCardLinkField.value);
  addCardTitleField.value = "";
  addCardLinkField.value = "";
  closePopup(popupAddCard);
}

function initElements() {
  //initialCards - массив для первоначального заполнения на странице, объявлен в файле initialCards.js
  initialCards.reverse();

  initialCards.forEach(card => {
    createCard(card.name, card.link);
  });
}

function openEditProfilePopup() {
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

editButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

formProfileEdit.addEventListener('submit', updateProfile);
formAddCard.addEventListener('submit', addCard);

//назначим всем кнопкам закрытия попапов функцию
const popupList = document.querySelectorAll(".popup");
for (i = 0; i < popupList.length; i++) {
  const popup = popupList[i];
  popup.querySelector(".popup__close-button").addEventListener('click', () => closePopup(popup));
}

initElements();
