class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._submitButtonElement = formElement.querySelector(this._submitButtonSelector);
    };

    enableValidation() {
        this._setEventListeners();
    };
    
    resetValidation (buttonDisabledState) {
        this._inputList.forEach((inputElement) =>{
            this._hideInputError(inputElement);
        });        
        this._formElement.reset();
        
       if (buttonDisabledState === true) {
           this._disableButton(this._submitButtonElement);
       } else {
           this._enableButton(this._submitButtonElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    _disableButton(button) {
        button.classList.add(this._inactiveButtonClass);
        button.setAttribute("disabled", "disabled");
    };
    
    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass);
        button.removeAttribute("disabled", "disabled");
    };

    _toggleSubmitButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(this._submitButtonElement);
        }
        else {
            this._enableButton(this._submitButtonElement);
        }
    };

    _setEventListeners() {    
        this._toggleSubmitButtonState(this._inputList);
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", ()  => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitButtonState(this._inputList);
            });
        });
    };
}

export default FormValidator;