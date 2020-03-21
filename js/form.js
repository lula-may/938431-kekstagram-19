'use strict';

(function () {
  var uploadFormElement = document.querySelector('#upload-select-image');
  var uploadInputElement = uploadFormElement.querySelector('#upload-file');

  // Определяем валидность хэш-тэгов
  var MAX_HASHTAG_AMOUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var hashtagsInputElement = document.querySelector('.text__hashtags');
  var setHashtagsValidity = function (hashsString) {
    var hashs = hashsString.split(/ +/);
    if (!hashs[hashs.length - 1]) {
      hashs.pop();
    }
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
