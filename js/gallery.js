'use strict';

// Создаем элементы на основе шаблона и сгенерированных данных
var template = document.querySelector('#picture').content;
var pictureContainerElement = document.querySelector('.pictures');
var onPictureClick = function (evt) {
  evt.preventDefault();
  var picture = evt.currentTarget;
  window.preview.show(picture.data);
};

var getPhotoList = function (arr) {
  var fragment = document.createDocumentFragment();
  arr.forEach(function (item) {
    var newElement = template.cloneNode(true);
    var picture = newElement.querySelector('.picture');
    newElement.querySelector('img').src = item.url;
    newElement.querySelector('.picture__likes').textContent = item.likes;
    newElement.querySelector('.picture__comments').textContent = item.comments.length;
    picture.addEventListener('click', onPictureClick);
    picture.data = item;
    fragment.appendChild(newElement);
  });
  pictureContainerElement.appendChild(fragment);
};

getPhotoList(window.data);

// Открытие формы для редактирования изображения
var ESC_KEY = 'Escape';

var bodyElement = document.querySelector('body');
var upLoadFormElement = document.querySelector('#upload-select-image');
var uploadInputElement = upLoadFormElement.querySelector('#upload-file');
var upLoadOverlayElement = upLoadFormElement.querySelector('.img-upload__overlay');
var hashtagsInputElement = document.querySelector('.text__hashtags');
var commentElement = upLoadFormElement.querySelector('textarea');

var closeModal = function () {
  window.form.disable();
  upLoadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
};

var openModal = function () {
  bodyElement.classList.add('modal-open');
  upLoadOverlayElement.classList.remove('hidden');
  var closeButtonElement = upLoadOverlayElement.querySelector('#upload-cancel');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscPress);
  window.form.enable();
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

