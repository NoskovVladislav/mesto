// Михаил, добрый день! Если я вас верно понял, то поправил инпутлист, касательно кнопок я так понимаю вы написали для примера, ибо они же не относятся к попап) Все остальыне перемеменные находятся либо в конструкторе или слушателях) Хорошего Вам дня!
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submitForm, container }) {
    super(container);
    this._submitForm = submitForm;
    this._formSelector = this._container.querySelector('.popup__form');
    this._inputList = this._formSelector.querySelectorAll('.popup__input');
  }

  // Метод собирает информацию с полей формы и возвращает объектом
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._formSelector.reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', this._handleSubmitForm);
  }

  // метод описывает функционал события отправки формы
  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    this.close(this._container);
  }
}