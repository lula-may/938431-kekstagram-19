'use strict';

(function () {
  var upLoadFormElement = document.querySelector('#upload-select-image');
  var uploadInputElement = upLoadFormElement.querySelector('#upload-file');

  // Определяем валидность хэш-тэгов
  var MAX_HASHTAG_AMOUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var hashtagsInputElement = document.querySelector('.text__hashtags');
  var setHashtagsValidity = function (hashsString) {
    hashtagsInputElement.setCustomValidity('');
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

  var onHashInputChange = function (evt) {
    setHashtagsValidity(evt.target.value);
  };

  var enableForm = function () {
    window.picture.enable();
    hashtagsInputElement.addEventListener('change', onHashInputChange);
  };

  var disableForm = function () {
    window.picture.disable();
    uploadInputElement.value = '';
    upLoadFormElement.reset();
  };

  window.form = {
    enable: enableForm,
    disable: disableForm
  };
})();
