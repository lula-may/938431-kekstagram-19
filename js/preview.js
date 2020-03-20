'use strict';

(function () {
  // Показываем элемент big-picture
  var ESC_KEY = 'Escape';

  var bigPictureElement = document.querySelector('.big-picture');

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

  var onCloseBigPictureButtonClick = function () {
    bigPictureElement.classList.add('hidden');
    bigPictureElement.removeEventListener('click', onCloseBigPictureButtonClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      bigPictureElement.classList.add('hidden');
      document.removeEventListener('keydown', onEscPress);
    }
  };
  var showBigPicture = function (data) {
    fillBigPicture(data);
    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
    var closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
    closeButtonElement.addEventListener('click', onCloseBigPictureButtonClick);
    document.addEventListener('keydown', onEscPress);
    bigPictureElement.classList.remove('hidden');
  };

  window.preview = {
    show: showBigPicture
  };
})();
