'use strict';

(function () {
  // Показываем элемент big-picture
  var ESC_KEY = 'Escape';
  var MAX_COMMENTS_PORTION = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var moreCommentsElement = bigPictureElement.querySelector('.comments-loader');
  var commentsAmountElement = bigPictureElement.querySelector('.comments-amount');
  var commentsCount;

  // Показываем комментарии других пользователей
  var showCommentsPortion = function (listItem, list, arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (el) {
      var newElement = listItem.cloneNode(true);
      var avatar = newElement.querySelector('img');
      avatar.src = el.avatar;
      avatar.alt = el.name;
      newElement.querySelector('.social__text').textContent = el.message;
      fragment.appendChild(newElement);
    });
    list.appendChild(fragment);
  };

  var getMoreComments = function (comments, listItem, list, maxAmount) {
    var nextComments = comments.splice(0, MAX_COMMENTS_PORTION);
    commentsCount += nextComments.length;
    showCommentsPortion(listItem, list, nextComments);
    commentsAmountElement.textContent = commentsCount;
    if (commentsCount === maxAmount) {
      moreCommentsElement.classList.add('hidden');
    }
  };

  var initCommentList = function (list, arr) {
    var listItem = list.querySelector('li');
    var commentsAmount = arr.length;
    var copies = arr.slice();
    commentsCount = 0;

    var onMoreCommentsClick = function () {
      getMoreComments(copies, listItem, list, commentsAmount);
    };

    list.innerHTML = '';
    getMoreComments(copies, listItem, list, commentsAmount);
    moreCommentsElement.addEventListener('click', onMoreCommentsClick);
  };

  // Заполняем элемент на основе данных
  var fillBigPicture = function (data) {
    bigPictureElement.querySelector('.big-picture__img img').src = data.url;
    bigPictureElement.querySelector('.likes-count').textContent = data.likes;
    bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
    var commentsListElement = bigPictureElement.querySelector('.social__comments');
    initCommentList(commentsListElement, data.comments);
    bigPictureElement.querySelector('.social__caption').textContent = data.description;
  };

  var closePreview = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    moreCommentsElement.classList.remove('hidden');
  };

  var onCloseButtonClick = function () {
    closePreview();
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePreview();
    }
  };

  var showBigPicture = function (data) {
    fillBigPicture(data);
    var closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
    closeButtonElement.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscPress);
    bigPictureElement.classList.remove('hidden');
  };

  window.preview = {
    show: showBigPicture
  };
})();
