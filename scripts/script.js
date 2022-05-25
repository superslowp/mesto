const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

const popupWindow = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container");

const nameField = document.querySelector(".popup__input_type_name");
const occupationField = document.querySelector(".popup__input_type_occupation");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");


function openPopup() {         
    nameField.value = profileName.textContent;
    occupationField.value = profileOccupation.textContent;    
    popupWindow.classList.add('popup_opened');
}

function closePopup() {    
    popupWindow.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function updateProfile(evt) {
    evt.preventDefault();  
    profileName.textContent = nameField.value;
    profileOccupation.textContent = occupationField.value;
    closePopup();
}

formElement.addEventListener('submit', updateProfile);