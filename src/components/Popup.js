export default class Popup {
  constructor(containerSelector) {
    this._container = document.querySelector(`${containerSelector}`);
  }

  // Метод открытия попапа
  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод закрытия попапа
  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод содержащий функционал нажатия на ESC 
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Метод клика по зонам контейнера
  _handleClickContainer = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      this.close();
    }
  }

  // Метод добавляющий слушатели событий
  setEventListeners() {
    this._container.addEventListener('click', this._handleClickContainer);
  }
}