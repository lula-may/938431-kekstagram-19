'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var bodyElement = document.querySelector('body');
  var upLoadFormElement = document.querySelector('#upload-select-image');
  var uploadInputElement = upLoadFormElement.querySelector('#upload-file');
  var upLoadOverlayElement = upLoadFormElement.querySelector('.img-upload__overlay');
  var hashtagsInputElement = document.querySelector('.text__hashtags');
  var commentElement = upLoadFormElement.querySelector('textarea');
  var template = document.querySelector('#picture').content;
  var pictureContainerElement = document.querySelector('.pictures');
  var photos = [];
  // Показываем фотографию при клике на превью
  var onPictureClick = function (evt) {
    evt.preventDefault();
    var picture = evt.currentTarget;
    window.preview.show(picture.data);
  };

  // Создаем элементы на основе полученных данных данных
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
      photos.push(picture);
      fragment.appendChild(newElement);
    });
    pictureContainerElement.appendChild(fragment);
  };

  var updatePhotoList = function (arr) {
    photos.forEach(function (el) {
      el.remove();
    });
    photos = [];
    getPhotoList(arr);
  };

  // Открытие и закрытие формы для редактирования изображения
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

  // Загрузка данных с сервера
  var onSuccessLoad = function (data) {
    getPhotoList(data);
    window.filter.enable(data);
  };

  window.backend.load(onSuccessLoad, window.error.show);

  uploadInputElement.addEventListener('change', onUploadChange);

  window.gallery = {
    update: updatePhotoList,
    closeModal: closeModal
  };
})();
