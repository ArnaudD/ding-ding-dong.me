(function() {
  var FileHandler, Photo;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Photo = (function() {
    function Photo(file) {
      $('#photo').show();
      this.initCanvas(file);
    }
    Photo.prototype.initCanvas = function(file) {
      var img, reader;
      img = document.createElement('img');
      img.addEventListener('load', (__bind(function(e) {
        var height, image, width;
        width = 700 - 40;
        height = (width / img.width) * img.height;
        this.canvas = oCanvas.create({
          canvas: "#photo-canvas"
        });
        this.canvas.width = width;
        this.canvas.height = height;
        console.log(width);
        console.log(height);
        console.log(this.canvas);
        image = this.canvas.display.image({
          x: 0,
          y: 0,
          width: width,
          height: height,
          image: img
        });
        return this.canvas.addChild(image);
      }, this)), false);
      reader = new FileReader();
      reader.onload = __bind(function(e) {
        console.log('reader');
        return img.src = e.target.result;
      }, this);
      return reader.readAsDataURL(file);
    };
    return Photo;
  })();
  FileHandler = (function() {
    function FileHandler() {
      this.dropzone = $('#dropzone').get(0);
      this.initEventHandlers();
    }
    FileHandler.prototype.initEventHandlers = function() {
      this.dropzone.ondragenter = this.onFileDragEnter;
      this.dropzone.ondragover = this.onFileDragEnter;
      this.dropzone.ondragleave = this.onFileDragLeave;
      this.dropzone.ondragend = this.onFileDragLeave;
      return this.dropzone.ondrop = this.onFileDrop;
    };
    FileHandler.prototype.onFileDragEnter = function(e) {
      this.className = 'file-hover';
      return false;
    };
    FileHandler.prototype.onFileDragLeave = function(e) {
      this.className = '';
      return false;
    };
    FileHandler.prototype.onFileDrop = function(e) {
      var file, _i, _len, _ref;
      e.preventDefault();
      _ref = e.dataTransfer.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.type.indexOf('image') !== -1) {
          this.className = '';
          $(this).hide();
          new Photo(file);
          return false;
        }
      }
      alert('No image found, try again !');
      return false;
    };
    return FileHandler;
  })();
  $(document).ready(function() {
    return new FileHandler;
  });
}).call(this);
