'use strict';

(function () {
  // Определение уровня насыщенности эффекта
  var NO_EFFECT = 'effect-none';
  var ID_PREFIX = 'effect';
  var CLASS_PREFIX = 'effects__preview-';
  var PERCENTS = 100;
  var DEFAULT_LEVEL = '100%';
  var MIN_SCALE = 0.25;
  var MAX_SCALE = 1;

  var uploadElement = document.querySelector('.img-upload');
  var scaleElement = uploadElement.querySelector('.scale');
  var scaleInputElement = scaleElement.querySelector('.scale__control--value');
  var reduceButtonElement = scaleElement.querySelector('.scale__control--smaller');
  var enlargeButtonElement = scaleElement.querySelector('.scale__control--bigger');
  var previewElement = uploadElement.querySelector('.img-upload__preview img');
  var effectRadioElements = uploadElement.querySelectorAll('.effects__radio');

  // Изменение размера изображения
  var currentScale;

  var changeImageSize = function (scale) {
    previewElement.style.transform = 'scale(' + scale + ')';
    scaleInputElement.value = scale * PERCENTS + '%';
  };

  var reduceImage = function () {
    if (currentScale !== MIN_SCALE) {
      currentScale -= MIN_SCALE;
      changeImageSize(currentScale);
    }
  };

  var enlargeImage = function () {
    if (currentScale !== MAX_SCALE) {
      currentScale += MIN_SCALE;
      changeImageSize(currentScale);
    }
  };

  var onReduceButtonClick = function (evt) {
    evt.preventDefault();
    reduceImage();
  };

  var onEnlargeButtonClick = function (evt) {
    evt.preventDefault();
    enlargeImage();
  };

  var activateScale = function () {
    currentScale = MAX_SCALE;
    scaleInputElement.value = DEFAULT_LEVEL;
    reduceButtonElement.addEventListener('click', onReduceButtonClick);
    enlargeButtonElement.addEventListener('click', onEnlargeButtonClick);
  };

  // Наложение фильтров на изображение
  var currentEffect;

  var getFilterProperty = {
    'effect-chrome': function (level) {
      return 'grayscale(' + level / PERCENTS + ')';
    },
    'effect-sepia': function (level) {
      return 'sepia(' + level / PERCENTS + ')';
    },
    'effect-marvin': function (level) {
      return 'invert(' + level + '%)';
    },
    'effect-phobos': function (level) {
      return 'blur(' + Math.round(level * 3 / PERCENTS) + 'px)';
    },
    'effect-heat': function (level) {
      return 'brightness(' + Math.round(level * 3 / PERCENTS) + ')';
    }
  };

  var onEffectRadioChange = function (evt) {
    if (currentEffect !== evt.target.id) {
      currentEffect = evt.target.id;
      previewElement.classList = '';
      previewElement.style.filter = 'none';
      if (currentEffect !== NO_EFFECT) {
        var newClass = currentEffect.replace(ID_PREFIX, CLASS_PREFIX);
        previewElement.classList.add(newClass);
        updateCurrentEffect(PERCENTS);
        window.slider.update();
      }
    }
  };

  var updateCurrentEffect = function (level) {
    if (currentEffect) {
      previewElement.style.filter = 'none';
      previewElement.style.filter = getFilterProperty[currentEffect](level);
    }
  };

  var setEventListener = function (element) {
    element.addEventListener('change', onEffectRadioChange);
  };

  var activateRadios = function () {
    [].forEach.call(effectRadioElements, function (radio) {
      setEventListener(radio);
    });
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

  var enablePictureEditor = function () {
    activateScale();
    activateRadios();
    window.slider.init(updateCurrentEffect);
  };

  var disablePictureEditor = function () {
    disableRadios();
    resetPreview();
    window.slider.reset();
  };

  window.picture = {
    enable: enablePictureEditor,
    disable: disablePictureEditor
  };
})();
