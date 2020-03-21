'use strict';

(function () {
  var PREFIX = 'filter-';
  var MAX_RANDOM_AMOUNT = 10;
  var filtersSectionElement = document.querySelector('.img-filters');
  var filterElements = filtersSectionElement.querySelectorAll('.img-filters__button');
  var defaultFilterElement = filtersSectionElement.querySelector('.img-filters__button--active');
  var currentFilter = defaultFilterElement;
  var serverPhotos;

  var getRandomNumber = function (max) {
    return Math.round(Math.random() * max);
  };

  var getDefaultPhotos = function () {
    return serverPhotos;
  };

  var getRandomPhotos = function () {
    var copies = serverPhotos.slice();
    var randomPhotos = [];
    for (var i = 0; i < MAX_RANDOM_AMOUNT; i++) {
      var nextPhoto = copies.splice(getRandomNumber(copies.length - 1), 1)[0];
      randomPhotos.push(nextPhoto);
    }
    return randomPhotos;
  };

  var getDiscussedPhotos = function () {
    var copies = serverPhotos.slice();
    copies.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    return copies;
  };

  var sortedData = {
    'default': getDefaultPhotos,
    'random': getRandomPhotos,
    'discussed': getDiscussedPhotos
  };

  var updateCurrentFilter = window.debounce(function (newFilter) {
    currentFilter.classList.remove('img-filters__button--active');
    currentFilter = newFilter;
    currentFilter.classList.add('img-filters__button--active');
    var filterName = (currentFilter.id).replace(PREFIX, '');
    window.gallery.update(sortedData[filterName]());
  });

  var onFilterButtonClick = function (evt) {
    if (evt.target !== currentFilter) {
      updateCurrentFilter(evt.target);
    }
  };

  var enableFilter = function (data) {
    filtersSectionElement.classList.remove('img-filters--inactive');
    serverPhotos = data;
    [].forEach.call(filterElements, function (el) {
      el.addEventListener('click', onFilterButtonClick);
    });
    getDiscussedPhotos();
  };

  window.filter = {
    enable: enableFilter,
    update: updateCurrentFilter
  };
})();
