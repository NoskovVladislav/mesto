// Выбираем элементы Popup's
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const popupImage = document.querySelector('#popup-image');
const popupElemImg = popupImage.querySelector('.popup__image');
const popupElemCaptain = popupImage.querySelector('.popup__caption');

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

// Выбираем блок Places
const placestemplate = document.querySelector(".places-template");
const placesList = document.querySelector('.places');

// 
const newLinkCard = popupFormAdd.querySelector('.popup__input_type_photo');
const newNameCard = popupFormAdd.querySelector('.popup__input_type_place-name');

// Функция нажатия на ESC
function pressingEscape(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup__opened')
    closePopup(popupIsOpen);
  }
}

// Функуция открытия Popup
function showPopup(popup) {
  document.addEventListener('keydown', pressingEscape);
  popup.classList.add('popup__opened');
};

// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', pressingEscape);
};

//Функция создания карточки 
function createCard(name, link) {
  const element = placestemplate.content.cloneNode(true);
  // находим элементы в DOM
  const elementTitle = element.querySelector(".place__title");
  const elementImage = element.querySelector(".place__image");
  const placeButtonRemove = element.querySelector(".place__button-remove");
  const placeButtonLike = element.querySelector(".place__button-like");

  // Подставляем пришедшие значения в шаблон новой карточки
  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;

  // Отслеживаем событие клика кнопки Удаление
  placeButtonRemove.addEventListener("click", evt => {
    evt.target.closest(".place").remove();
  });

  // Отслеживаем событие клика кнопки Лайк
  placeButtonLike.addEventListener('click', evt => {
    evt.target.classList.toggle("place__button-like_active");
  });

  // Отслеживаем событие клика на картинку
  elementImage.addEventListener('click', evt => {
    popupElemImg.alt = evt.target.alt;
    popupElemImg.src = evt.target.src;
    popupElemCaptain.textContent = name;
    showPopup(popupImage);
  });
  return element; //возвращается созданная карточка 
}

// Функция добавления карточки в контейнер
function addCard(container, cardElement) {
  container.prepend(cardElement);
}

// Перебор элементов массива с функцией addCard
initialCards.forEach(item => {
  addCard(placesList, createCard(item.name, item.link));
});

// Перебор всех попапов 
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

// Отслеживаем событие отправки формы "Новой карточки"
popupFormAdd.addEventListener("submit", evt => {
  evt.preventDefault()
  addCard(placesList, createCard(newNameCard.value, newLinkCard.value)); // Добавляем новую карточку
  closePopup(popupAddCard); // закрываем форму
  popupFormAdd.reset(); // сбрасываем значения формы
});

// Отслеживаем событие отправки формы "Редактирования Profile" и отправляем полученые значения 
popupFormEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  profileTitle.textContent = popupNameField.value;
  profileSubtitle.textContent = popupStatusField.value;
  closePopup(popupProfile);
  popupFormEdit.reset();
});

// Отслеживаем событие клика кнопки "редактировать" 
profileEditButton.addEventListener('click', () => {
  popupNameField.value = profileTitle.textContent;
  popupStatusField.value = profileSubtitle.textContent;
  showPopup(popupProfile);
});

// Отслеживаем событие клика кнопки "добавить карточку" 
profileAddButton.addEventListener('click', () => {
  showPopup(popupAddCard);
});