'use strict';

(function () {
  var PIN_RADIUS = 9;
  var DOUBLE = 2;
  var PERCENTS = 100;

  var sliderElement = document.querySelector('.effect-level');
  var effectLineElement = sliderElement.querySelector('.effect-level__line');
  var pinElement = effectLineElement.querySelector('.effect-level__pin');
  var effectDepthElement = effectLineElement.querySelector('.effect-level__depth');
  var effectLevelInputElement = sliderElement.querySelector('.effect-level__value');
  var maxX;

  var setNewEffectLevel = function (level) {
    effectLevelInputElement.value = level;
  };

  var setPinLocation = function (x) {
    if (x <= maxX && x >= PIN_RADIUS) {
      pinElement.x = x;
    }
  };

  var initSlider = function (onStateChange) {
    var lineWidth = effectLineElement.offsetWidth - PIN_RADIUS * DOUBLE;
    maxX = lineWidth + PIN_RADIUS;
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
        level = getEffectLevel(pinElement.x - PIN_RADIUS);
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
    pinElement.style.left = maxX + 'px';
    effectDepthElement.style.width = maxX + 'px';
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
