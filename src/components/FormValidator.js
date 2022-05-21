export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._inputInvalidClass = config.inputInvalidClass;
    this._buttonInvalidClass = config.buttonInvalidClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  };

  _showError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage; // Текст ошибки равен дефолтному значению ошибок браузера 
    input.classList.add(this._inputInvalidClass); // Добавляем класс невалидного инпута 
  };

  _hideError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = ''; // Убираем текст ошибки 
    input.classList.remove(this._inputInvalidClass); // Удаляем класс невалидного инпута 
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    };
  };

  setButtonState() {
    // Если кнопка активна убираем класс и состояние, и наоборот 
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._buttonInvalidClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._buttonInvalidClass);
      this._submitButton.disabled = true;
    };
  };

  clearError() {
    this._inputList.forEach((item) => {
      this._hideError(item);
    });
    this.setButtonState();
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.setButtonState(); // проверяем состояние кнопки 
      });
    });
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // убираем дефолтное поведение кнопки отправить форму 
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
};