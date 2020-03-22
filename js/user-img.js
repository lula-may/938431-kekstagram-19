'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewElement = document.querySelector('.img-upload__preview img');

  var showUserPhoto = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  window.userImg = {
    show: showUserPhoto
  };
})();
