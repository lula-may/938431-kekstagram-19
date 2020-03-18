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
// bigPictureElement.classList.remove('hidden');

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

// Открытие формы для редактирования изображения
var ESC_KEY = 'Escape';

var bodyElement = document.querySelector('body');
var upLoadFormElement = document.querySelector('#upload-select-image');
var uploadInputElement = upLoadFormElement.querySelector('#upload-file');
var upLoadOverlayElement = upLoadFormElement.querySelector('.img-upload__overlay');
var commentElement = upLoadFormElement.querySelector('textarea');
var closeModal = function () {
  disableRadios();
  resetPreview();
  upLoadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInputElement.value = '';
  upLoadFormElement.reset();
  document.removeEventListener('keydown', onEscPress);
};

var openModal = function () {
  bodyElement.classList.add('modal-open');
  upLoadOverlayElement.classList.remove('hidden');
  var closeButtonElement = upLoadOverlayElement.querySelector('#upload-cancel');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscPress);
  initSlider();
  activateRadios();
};

var onCloseButtonClick = function () {
  closeModal();
};

var onEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== hashtagsInputElement && evt.target !== commentElement) {
    closeModal();
  }
};

var onUploadChange = function (evt) {
  evt.preventDefault();
  openModal();
};

uploadInputElement.addEventListener('change', onUploadChange);

// Определение уровня насыщенности эффекта
var NO_EFFECT = 'effect-none';
var ID_PREFIX = 'effect';
var CLASS_PREFIX = 'effects__preview-';
var PERCENTS = 100;
var currentEffect;
var uploadElement = document.querySelector('.img-upload');
var previewElement = uploadElement.querySelector('.img-upload__preview img');
var effectLineElement = uploadElement.querySelector('.effect-level__line');
var pinElement = effectLineElement.querySelector('.effect-level__pin');
var effectRadioElements = uploadElement.querySelectorAll('.effects__radio');
var effectLevelInputElement = uploadElement.querySelector('.effect-level__value');
var getCssText = {
  'effect-chrome': function (level) {
    return 'filter: grayscale(' + Math.round(level * 100) / 100 + ');';
  },
  'effect-sepia': function (level) {
    return 'filter: sepia(' + Math.round(level * 100) / 100 + ');';
  },
  'effect-marvin': function (level) {
    return 'filter: invert(' + Math.round(level * 100) + '%);';
  },
  'effect-phobos': function (level) {
    return 'filter: blur(' + Math.round(level * 3) + 'px);';
  },
  'effect-heat': function (level) {
    return 'filter: brightness(' + Math.round(level * 3) + ');';
  }
};

var onEffectRadioChange = function (evt) {
  if (currentEffect !== evt.target.id) {
    currentEffect = evt.target.id;
    previewElement.classList = '';
    previewElement.style.cssText = '';
    if (currentEffect !== NO_EFFECT) {
      var newClass = currentEffect.replace(ID_PREFIX, CLASS_PREFIX);
      previewElement.classList.add(newClass);
    }
  }
};

var updateCurrentEffect = function (level) {
  previewElement.style.cssText = '';
  previewElement.style.cssText = getCssText[currentEffect](level);
  effectLevelInputElement.value = Math.round(level * PERCENTS);
};

var setEventListener = function (element) {
  element.addEventListener('change', onEffectRadioChange);
};

var activateRadios = function () {
  [].forEach.call(effectRadioElements, function (radio) {
    setEventListener(radio);
  });
};

var initSlider = function () {
  var lineWidth = effectLineElement.offsetWidth;
  var pinX = pinElement.offsetLeft;
  var level = pinX / lineWidth;

  var onPinMouseup = function (evt) {
    var pinLocation = evt.target.offsetLeft;
    level = pinLocation / lineWidth;
    updateCurrentEffect(level);
  };

  pinElement.addEventListener('mouseup', onPinMouseup);
};

var resetPreview = function () {
  currentEffect = null;
  previewElement.removeAttribute('class');
  previewElement.removeAttribute('style');
};

var disableRadios = function () {
  previewElement.classList = '';
  [].forEach.call(effectRadioElements, function (radio) {
    radio.removeEventListener('change', onEffectRadioChange);
  });
};

// Определяем валидность хэш-тэгов
var MAX_HASHTAG_AMOUNT = 5;
var MAX_HASHTAG_LENGTH = 20;
var hashtagsInputElement = document.querySelector('.text__hashtags');
var setHashtagsValidity = function (hashsString) {
  hashtagsInputElement.setCustomValidity('');
  var hashs = hashsString.split(' ');
  var reg = /^#[a-zа-я0-9]+$/;
  for (var i = 0; i < hashs.length; i++) {
    var hash = hashs[i].toLowerCase();
    var bool = reg.test(hash);
    if (!bool) {
      hashtagsInputElement.setCustomValidity('Не подходит формат хэш-тегов. Хэш-тэг должен начинаться с # и состоять только из букв и цифр');
      return;
    }
    if (hash.length > MAX_HASHTAG_LENGTH) {
      hashtagsInputElement.setCustomValidity('Длина хэш-тега не должна быть более 20 символов');
      return;
    }
    for (var j = i + 1; j < hashs.length; j++) {
      if (hash === hashs[j]) {
        hashtagsInputElement.setCustomValidity('Хэш-теги не должны повторяться. Удалите повтряющиеся хэш-тэги.');
        return;
      }
    }
  }

  if (hashs.length > MAX_HASHTAG_AMOUNT) {
    hashtagsInputElement.setCustomValidity('Можно задать не более пяти хэш-тэгов');
    return;
  }
  hashtagsInputElement.setCustomValidity('');
};

var onHashInputChange = function (evt) {
  setHashtagsValidity(evt.target.value);
};
hashtagsInputElement.addEventListener('change', onHashInputChange);
