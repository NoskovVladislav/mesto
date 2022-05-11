import Card from './Card.js';
import { FormValidator } from "./formValidator.js";

// массив 6 карточек 
const initialCards = [
  {
    name: 'Ординская пещера, Пермский край',
    link: 'https://static.tildacdn.com/tild3931-6539-4230-b733-383936376339/03_ordinskaya_pesher.jpg'
  },
  {
    name: 'Чарские пески, Забайкалье',
    link: 'https://static.tildacdn.com/tild6237-3434-4061-b334-633431633834/05_charskie_peski.jpg'
  },
  {
    name: 'Гамсутль, Дагестан',
    link: 'https://static.tildacdn.com/tild6530-6331-4263-b833-653831646134/12_Gamstul.jpg'
  },
  {
    name: 'Мраморный каньон Рускеала, Карелия',
    link: 'https://static.tildacdn.com/tild6136-6366-4262-a531-393631633931/13_Ruskeala.jpg'
  },
  {
    name: 'Розовое озеро Сасык-Сиваш, Крым',
    link: 'https://static.tildacdn.com/tild6535-3937-4331-b732-336136616164/11_Sasyk-sivash.jpg'
  },
  {
    name: 'Болгар. Татарстан',
    link: 'https://static.tildacdn.com/tild3963-6363-4330-b031-393239356436/18_Bolgar.jpg'
  }
];


// Выбираем элементы Popup's
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const popupElemImg = document.querySelector('.popup__image');
const popupElemCaptain = document.querySelector('.popup__caption');
const popupImage = document.querySelector('#popup-image');
// Выбираем формы по id 
const popupFormAdd = document.querySelector('#popup-form-add');
const popupFormEdit = document.querySelector('#popup-form-edit');
// Выбираем елементы форм
const popupNameField = document.querySelector('.popup__input_type_author');
const popupStatusField = document.querySelector('.popup__input_type_status');
// Выбираем элементы блока Profile
const profileTitle = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
// Выбираем контейнер для карточек
const placesList = document.querySelector('.places');

// конфигурация селекторов Popup
const validationConfigPopup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};

// Функция нажатия на ESC
function pressingEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened')
    closePopup(openedPopup);
  }
};

// Функция клика на фото (открытие попапа)
export function handleImageClick(name, link,) {
  popupElemImg.src = link;
  popupElemCaptain.textContent = name;
  popupElemImg.alt = name;
  showPopup(popupImage);
};

// Функуция открытия Popup
function showPopup(popup) {
  document.addEventListener('keydown', pressingEscape);
  popup.classList.add('popup__opened');
};

// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', pressingEscape);
  popupFormAdd.reset();
};

// Функция создает и возвращает карточку
function createCard(data) {
  const card = new Card(data, '.places-template'); // создаем экземпляр Card
  const cardElement = card.generateCard(); // запускаем публичную функцию в экземпляре
  return cardElement
};

// функция добавляет карточку на страницу
function addCard(container, cardElement) {
  container.prepend(cardElement);
};

// Перебор массива с данными и отправка в функцию AddCard в публичной функции Card
initialCards.forEach(item => {
  addCard(placesList, createCard(item));
});

// Перебор всех попапов 
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    //Проверяем наличие класс при отжатии мышки для дальнейшего закрытия по фону попапов
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

// Отслеживаем событие отправки формы "Новой карточки"
popupFormAdd.addEventListener("submit", evt => {
  evt.preventDefault() // сброс дефолтной отправки формы
  const newCard = {}; // создаем объект для отправи в класс Card
  newCard.name = popupFormAdd['popup-input-place-name'].value; // Значения полей формы 
  newCard.link = popupFormAdd['popup-input-url'].value;
  addCard(placesList, createCard(newCard)); // Добавляем новую карточку заполненую в форме юзером
  popupFormAdd.reset();
  closePopup(popupAddCard); // закрываем форму
  // сбрасываем значения формы
});

// Отслеживаем событие отправки формы "Редактирования Profile" и отправляем полученые значения 
popupFormEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  profileTitle.textContent = popupNameField.value; // Значения полей формы 
  profileSubtitle.textContent = popupStatusField.value;
  popupFormEdit.reset();
  closePopup(popupProfile);
});

// Отслеживаем событие клика кнопки "редактировать" 
profileEditButton.addEventListener('click', () => {
  popupNameField.value = profileTitle.textContent; // Значения полей формы 
  popupStatusField.value = profileSubtitle.textContent;
  editPupupValidator.clearError();
  showPopup(popupProfile);
});

// Отслеживаем событие клика кнопки "добавить карточку" 
profileAddButton.addEventListener('click', () => {
  addPupupValidator.setButtonState();
  addPupupValidator.clearError();
  showPopup(popupAddCard);
});

// Создаем валидацию для формы редактирования профиля
const editPupupValidator = new FormValidator(validationConfigPopup, popupFormEdit);
editPupupValidator.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const addPupupValidator = new FormValidator(validationConfigPopup, popupFormAdd);
addPupupValidator.enableValidation();


