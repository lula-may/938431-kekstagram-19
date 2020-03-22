'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successContainerElement = document.querySelector('main');
  var successElement;

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      hideMessage();
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      hideMessage();
    }
  };

  var hideMessage = function () {
    successElement.remove();
    document.removeEventListener('keydown', onEscPress);
    window.removeEventListener('click', onDocumentClick);
  };

  var showMessage = function () {
    successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', onDocumentClick);
    successContainerElement.appendChild(successElement);
  };

  window.success = {
    show: showMessage
  };
})();
