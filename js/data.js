'use strict';

(function () {
  // Генерируем моки
  var MIN_AMOUNT = 1;
  var MOCK_AMOUNT = 25;
  var DESCRIPTION = 'Это мы с семьей на отдыхе в Италии';
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var MOCK_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_AMOUNT = 5;
  var AVATAR_NUMBER_MAX = 6;
  var NAMES = ['Алексей', 'Анна', 'Павел', 'Катюха', 'Игорь', 'Ахмед', 'Лейла', 'Петрович', 'Валентин', 'Клава'];

  var getRandomNumberFrom = function (minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue)) + minValue;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumberFrom(0, arr.length - 1)];
  };

  var getRandomComments = function () {
    var comments = [];
    for (var i = 0; i < COMMENTS_AMOUNT; i++) {
      var item = {};
      item.avatar = 'img/avatar-' + getRandomNumberFrom(MIN_AMOUNT, AVATAR_NUMBER_MAX) + '.svg';
      item.message = getRandomElement(MOCK_COMMENTS);
      item.name = getRandomElement(NAMES);
      comments.push(item);
    }
    return comments;
  };

  var getMockup = function (index) {
    var mockup = {};
    mockup.url = 'photos/' + index + '.jpg';
    mockup.description = DESCRIPTION;
    mockup.likes = getRandomNumberFrom(LIKES_MIN, LIKES_MAX);
    mockup.comments = getRandomComments();
    return mockup;
  };

  var createMockups = function () {
    var mockups = [];
    for (var i = 0; i < MOCK_AMOUNT; i++) {
      mockups[i] = getMockup(i + 1);
    }
    return mockups;
  };

  window.data = createMockups();
})();
