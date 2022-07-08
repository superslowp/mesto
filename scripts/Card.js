class Card {
    constructor(cardData, openCard, config) {
        this._cardTitle = cardData.cardTitle;
        this._cardLink = cardData.cardLink;
        this._config = config;
        this._openCard = openCard;
        this._deleteCard = this._deleteCard.bind(this);
        this._setLike = this._setLike.bind(this);        
    };

    _setLike() {
        this._card.querySelector(this._config.cardLikeButtonSelector).classList.toggle(this._config.cardLikeActiveSelector);
    };

    _deleteCard() {
        this._card.remove();
    };

    _setEventListeners() {
        this._card.querySelector(this._config.cardLinkSelector).addEventListener("click", () => this._openCard(this._cardTitle, this._cardLink));
        this._card.querySelector(this._config.cardLikeButtonSelector).addEventListener("click", this._setLike);
        this._card.querySelector(this._config.cardTrashSelector).addEventListener("click", this._deleteCard);
    };

    createCard() {
        this._card = this._getTemplate();
        this._card.querySelector(this._config.cardTitleSelector).textContent = this._cardTitle;
        const cardImg = this._card.querySelector(this._config.cardPhotoSelector);
        cardImg.src = this._cardLink;
        cardImg.alt = this._cardTitle;

        this._setEventListeners();
       
        return this._card;
    };

    _getTemplate() {
        return document.querySelector(this._config.cardTemplateSelector)
            .content
            .querySelector(this._config.cardElementSelector)
            .cloneNode(true);
    };
}

export default Card;