// массив 6 карточек 
export const initialCards = [
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

// конфигурация селекторов Popup
export const validationConfigPopup = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inputInvalidClass: 'popup__input_state_invalid',
    buttonInvalidClass: 'popup__button-submit_invalid',
};

// Выбираем элементы Popup's
export const popupProfileContainer = document.querySelector('#popup-profile');
export const popupAddCardContainer = document.querySelector('#popup-add-card');
export const popupImageContainer = document.querySelector('#popup-image');
// Выбираем формы по id 
export const popupFormAddContainer = document.querySelector('#popup-form-add');
export const popupFormEditContainer = document.querySelector('#popup-form-edit');
// Выбираем елементы форм
export const popupNameField = document.querySelector('.popup__input_type_author');
export const popupStatusField = document.querySelector('.popup__input_type_status');
// Выбираем элементы блока Profile
export const profileTitleContainer = document.querySelector('.profile__author');
export const profileSubtitleContainer = document.querySelector('.profile__status');
export const profileEditButton = document.querySelector('.profile__button-edit');
export const profileAddButton = document.querySelector('.profile__button-add');
// Выбираем контейнер для карточек
export const placesListContainer = document.querySelector('.places');

