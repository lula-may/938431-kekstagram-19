'use strict';

(function () {
  // Определение уровня насыщенности эффекта
  var NO_EFFECT = 'effect-none';
  var ID_PREFIX = 'effect';
  var CLASS_PREFIX = 'effects__preview-';
  var PERCENTS = 100;
  var DEFAULT_LEVEL = '100%';
  var currentEffect;
  var uploadElement = document.querySelector('.img-upload');
  var previewElement = uploadElement.querySelector('.img-upload__preview img');
  var effectLineElement = uploadElement.querySelector('.effect-level__line');
  var pinElement = effectLineElement.querySelector('.effect-level__pin');
  var effectDepthElement = effectLineElement.querySelector('.effect-level__depth');
  var effectRadioElements = uploadElement.querySelectorAll('.effects__radio');
  var effectLevelInputElement = uploadElement.querySelector('.effect-level__value');
  var getCssText = {
    'effect-chrome': function (level) {
      return 'filter: grayscale(' + level / PERCENTS + ');';
    },
    'effect-sepia': function (level) {
      return 'filter: sepia(' + level / PERCENTS + ');';
    },
    'effect-marvin': function (level) {
      return 'filter: invert(' + level + '%);';
    },
    'effect-phobos': function (level) {
      return 'filter: blur(' + Math.round(level * 3 / PERCENTS) + 'px);';
    },
    'effect-heat': function (level) {
      return 'filter: brightness(' + Math.round(level * 3 / PERCENTS) + ');';
    }
  };

  var onEffectRadioChange = function (evt) {
    if (currentEffect !== evt.target.id) {
      currentEffect = evt.target.id;
      previewElement.classList = '';
      previewElement.style.cssText = '';
      if (currentEffect !== NO_EFFECT) {
        var newClass = currentEffect.replace(ID_PREFIX, CLASS_PREFIX);
        previewElement.classList.add(newClass);
        resetSlider(pinElement, effectDepthElement);
      }
    }
  };

  var updateCurrentEffect = function (level) {
    if (currentEffect) {
      previewElement.style.cssText = '';
      previewElement.style.cssText = getCssText[currentEffect](level);
    }
  };

  var setNewEffectLevel = function (level) {
    effectLevelInputElement.value = level;
  };

  var setEventListener = function (element) {
    element.addEventListener('change', onEffectRadioChange);
  };

  var activateRadios = function () {
    [].forEach.call(effectRadioElements, function (radio) {
      setEventListener(radio);
    });
  };

  var resetSlider = function () {
    pinElement.style.left = DEFAULT_LEVEL;
    effectDepthElement.style.width = DEFAULT_LEVEL;
    effectLevelInputElement.value = PERCENTS;
  };

  // Слайдер
  var PIN_RADIUS = 9;
  var MIN_X = 0;
  var initSlider = function () {
    var lineWidth = effectLineElement.offsetWidth;
    var maxX = MIN_X + lineWidth;
    pinElement.x = pinElement.offsetLeft;
    var level;

    var setPinLocation = function (x) {
      if (x <= maxX && x >= MIN_X) {
        pinElement.x = x;
      }
    };

    var getEffectLevel = function (coord) {
      return Math.round(coord * PERCENTS / lineWidth);
    };

    level = getEffectLevel(pinElement.x);


    var onMousedown = function (evt) {
      evt.preventDefault();
      var startX = evt.clientX;
      var shift;
      var currentX = evt.target.offsetLeft;

      var onMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        shift = startX - moveEvt.clientX;
        currentX -= shift;
        startX = moveEvt.clientX;
        setPinLocation(currentX);
        level = getEffectLevel(pinElement.x + PIN_RADIUS);
        pinElement.style.left = pinElement.x + 'px';
        effectDepthElement.style.width = pinElement.x + PIN_RADIUS + 'px';
        updateCurrentEffect(level);
        setNewEffectLevel(level);
      };

      var onMouseup = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('mouseup', onMouseup);
      };

      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup);
    };

    pinElement.addEventListener('mousedown', onMousedown);
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
    activateRadios();
    initSlider();
  };

  var disablePictureEditor = function () {
    disableRadios();
    resetPreview();
  };

  window.picture = {
    enable: enablePictureEditor,
    disable: disablePictureEditor
  };
})();
