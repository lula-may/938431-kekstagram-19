'use strict';

(function () {
  var MAX_HASHTAG_AMOUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var REG = /^#[a-zа-я0-9]+$/;

  var uploadFormElement = document.querySelector('#upload-select-image');
  var uploadInputElement = uploadFormElement.querySelector('#upload-file');
  var hashtagsInputElement = document.querySelector('.text__hashtags');

  // Определяем валидность хэш-тэгов
  var setHashtagsValidity = function (hashsString) {
    var hashs = hashsString.split(/ +/);
    if (!hashs[hashs.length - 1]) {
      hashs.pop();
    }
    for (var i = 0; i < hashs.length; i++) {
      var hash = hashs[i].toLowerCase();
      var match = REG.test(hash);
      if (!match) {
        hashtagsInputElement.setCustomValidity('Не подходит формат хэш-тегов. Хэш-тэг должен начинаться с # и состоять только из букв и цифр');
        return;
      }
      if (hash.length > MAX_HASHTAG_LENGTH) {
        hashtagsInputElement.setCustomValidity('Длина хэш-тега не должна быть более 20 символов');
        return;
      }
      for (var j = i + 1; j < hashs.length; j++) {
        if (hash === hashs[j].toLowerCase()) {
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

  var onSuccessfulSend = function (response) {
    window.success.show(response);
    window.gallery.closeModal();
  };

  var onHashInputChange = function (evt) {
    setHashtagsValidity(evt.target.value);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    return (uploadFormElement.reportValidity())
      ? window.backend.save(new FormData(uploadFormElement), onSuccessfulSend, window.error.show)
      : uploadFormElement.classList.add('img-upload__form--invalid');
  };

  var enableForm = function () {
    window.picture.enable();
    hashtagsInputElement.addEventListener('change', onHashInputChange);
    uploadFormElement.addEventListener('submit', onFormSubmit);
  };

  var disableForm = function () {
    window.picture.disable();
    uploadInputElement.value = '';
    uploadFormElement.reset();
    uploadFormElement.classList.toggle('img-upload__form--invalid', false);
  };

  window.form = {
    enable: enableForm,
    disable: disableForm
  };
})();
