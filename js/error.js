'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorContainerElement = document.querySelector('main');
  var errorElement;

  var onButtonClick = function (evt) {
    evt.preventDefault();
    hideErrorMessage();
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      hideErrorMessage();
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      hideErrorMessage();
    }
  };

  var hideErrorMessage = function () {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    window.removeEventListener('click', onDocumentClick);
  };

  var showErrorMessage = function (message) {
    errorElement = errorTemplate.cloneNode(true);
    var button = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__title').textContent = message;
    button.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', onDocumentClick);
    errorContainerElement.appendChild(errorElement);
  };

  window.error = {
    show: showErrorMessage
  };
})();
