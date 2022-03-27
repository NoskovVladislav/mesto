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
const popupImage = document.querySelector('#popup-image');

// Выбираем формы по id 
const popupFormAdd = document.querySelector('#popup-form-add');
const popupFormEdit = document.querySelector('#popup-form-edit');
// Выбираем елементы форм
const popupNameField = document.querySelector('.popup__input_type_author');
const popupStatusField = document.querySelector('.popup__input_type_status');
const popupNamePlaceField = document.querySelector('.popup__input_type_place-name');
const popupPlacePhoto = document.querySelector('.popup__input_type_photo');

// Выбираем элементы блока Profile
const profileTitle = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');

// Выбираем блок Places
const placesList = document.querySelector('.places');

// Функуция открытия Popup
function showPopup(popup) {
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });

  popup.classList.add('popup__opened');
  popup.removeEventListener('click', showPopup);
};

// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('popup__opened');
  document.removeEventListener('keydown', closePopup);
};

//Функция создания карточки 
function createCard(name, link) {
  // Находим элемент в DOM и клонируем контент в теге
  const element = document.querySelector(".places-template").content.cloneNode(true);

  // находим элементы в DOM
  const elementTitle = element.querySelector(".place__title");
  const elementImage = element.querySelector(".place__image");

  // Подставляем пришедшие значения в шаблон новой карточки
  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = 'Фотография местности ' + name;

  const placeButtonRemove = element.querySelector(".place__button-remove");
  const placeButtonLike = element.querySelector(".place__button-like");
  const placeImage = element.querySelector(".place__image");

  // Отслеживаем событие клика кнопки Удаление
  placeButtonRemove.addEventListener("click", evt => {
    evt.target.closest(".place").remove();
  });

  // Отслеживаем событие клика кнопки Лайк
  placeButtonLike.addEventListener('click', evt => {
    evt.target.classList.toggle("place__button-like_active");
  });

  // Отслеживаем событие клика на картинку
  placeImage.addEventListener('click', evt => {
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__caption').textContent = name;

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

  const newNameCard = popupFormAdd.querySelector('.popup__input_type_place-name').value; // Значения полей формы 
  const newLinkCard = popupFormAdd.querySelector('.popup__input_type_photo').value;

  addCard(placesList, createCard(newNameCard, newLinkCard)); // Добавляем новую карточку

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