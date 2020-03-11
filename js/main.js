'use strict';

// Генерируем моки
var MIN_AMOUNT = 1;
var MOCK_AMOUNT = 25;
var DESCRIPTION = 'Это мы с семьей на отдыхе в Италии';
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var MOCK_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var COMMENTS_AMOUNT = 5;
var AVATAR_NUMBER_MAX = 6;
var NAMES = ['Алексей', 'Анна', 'Павел', 'Катюха', 'Игорь', 'Ахмед', 'Лейла', 'Петрович', 'Валентин', 'Клава'];

var getRandomNumberFrom = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue)) + minValue;
};

var getRandomElement = function (arr) {
  return arr[getRandomNumberFrom(0, arr.length - 1)];
};

var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_AMOUNT; i++) {
    var item = {};
    item.avatar = 'img/avatar-' + getRandomNumberFrom(MIN_AMOUNT, AVATAR_NUMBER_MAX) + '.svg';
    item.message = getRandomElement(MOCK_COMMENTS);
    item.name = getRandomElement(NAMES);
    comments.push(item);
  }
  return comments;
};

var getMockup = function (index) {
  var mockup = {};
  mockup.url = 'photos/' + index + '.jpg';
  mockup.description = DESCRIPTION;
  mockup.likes = getRandomNumberFrom(LIKES_MIN, LIKES_MAX);
  mockup.comments = getRandomComments();
  return mockup;
};

var createMockups = function () {
  var mockups = [];
  for (var i = 0; i < MOCK_AMOUNT; i++) {
    mockups[i] = getMockup(i + 1);
  }
  return mockups;
};

// Создаем элементы на основе шаблона и сгенерированных данных

var template = document.querySelector('#picture').content;
var pictureContainerElement = document.querySelector('.pictures');
var getPhotoList = function (arr) {
  var fragment = document.createDocumentFragment();
  arr.forEach(function (item) {
    var newElement = template.cloneNode(true);
    newElement.querySelector('img').src = item.url;
    newElement.querySelector('.picture__likes').textContent = item.likes;
    newElement.querySelector('.picture__comments').textContent = item.comments.length;
    fragment.appendChild(newElement);
  });
  pictureContainerElement.appendChild(fragment);
};

var mockups = createMockups();
getPhotoList(mockups);

// Показываем элемент big-picture

var bigPictureElement = document.querySelector('.big-picture');
bigPictureElement.classList.remove('hidden');

var fillCommentsList = function (list, arr) {
  var listItem = list.querySelector('li');
  list.innerHTML = '';
  arr.forEach(function (el) {
    var newElement = listItem.cloneNode(true);
    var avatar = newElement.querySelector('img');
    avatar.src = el.avatar;
    avatar.alt = el.name;
    newElement.querySelector('.social__text').textContent = el.message;
    list.appendChild(newElement);
  });
};

var fillBigPicture = function (data) {
  bigPictureElement.querySelector('.big-picture__img img').src = data.url;
  bigPictureElement.querySelector('.likes-count').textContent = data.likes;
  bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  fillCommentsList(commentsListElement, data.comments);
  bigPictureElement.querySelector('.social__caption').textContent = data.description;
};

fillBigPicture(mockups[0]);
bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
