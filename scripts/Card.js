class Card {
    constructor(cardTitle, cardLink, openCard, config) {
        this._cardTitle = cardTitle;
        this._cardLink = cardLink;
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
        .children[0]
        .cloneNode(true);
    };
}

export default Card;