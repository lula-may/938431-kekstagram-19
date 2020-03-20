'use strict';

(function () {
  var MIN_X = 0;
  var PERCENTS = 100;
  var DEFAULT_LEVEL = '100%';

  var uploadElement = document.querySelector('.img-upload');
  var effectLineElement = uploadElement.querySelector('.effect-level__line');
  var pinElement = effectLineElement.querySelector('.effect-level__pin');
  var effectDepthElement = effectLineElement.querySelector('.effect-level__depth');
  var effectLevelInputElement = uploadElement.querySelector('.effect-level__value');

  var setNewEffectLevel = function (level) {
    effectLevelInputElement.value = level;
  };
  var setPinLocation = function (x, maxX) {
    if (x <= maxX && x >= MIN_X) {
      pinElement.x = x;
    }
  };

  var initSlider = function (onStateChange) {
    var lineWidth = effectLineElement.offsetWidth;
    var maxX = MIN_X + lineWidth;
    pinElement.x = pinElement.offsetLeft;
    var level;

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
        setPinLocation(currentX, maxX);
        level = getEffectLevel(pinElement.x);
        pinElement.style.left = pinElement.x + 'px';
        effectDepthElement.style.width = pinElement.x + 'px';
        onStateChange(level);
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

  var updateSlider = function () {
    pinElement.style.left = DEFAULT_LEVEL;
    effectDepthElement.style.width = DEFAULT_LEVEL;
    effectLevelInputElement.value = PERCENTS;
  };

  var resetSlider = function () {
    pinElement.style.left = '';
    effectDepthElement.style.width = '';
  };

  window.slider = {
    init: initSlider,
    reset: resetSlider,
    update: updateSlider
  };
})();
