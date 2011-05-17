(function() {
  var FileHandler, Photo, accessories;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  accessories = ['hair1.png', 'hair2.png', 'mouth1.png', 'glasses1.png', 'glasses2.png'];
  Photo = (function() {
    function Photo(file) {
      $('#photo').show();
      this.initCanvas(file);
      this.initAccessories();
      $('#share').show();
      $('#download a').click(__bind(function(e) {
        e.preventDefault();
        this.canvas.deactivateAll();
        return window.open(this.canvas.toDataURL('png'));
      }, this));
    }
    Photo.prototype.initCanvas = function(file) {
      var img, reader;
      img = document.createElement('img');
      img.addEventListener('load', (__bind(function(e) {
        var height, image, width;
        width = 700 - 40;
        height = (width / img.width) * img.height;
        this.canvas = new fabric.Element('photo-canvas');
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        image = new fabric.Image(img);
        image.scaleToWidth(width);
        image.scaleToHeight(height);
        image.lockRotation = true;
        image.lockScalingX = true;
        image.lockScalingY = true;
        image.lockMovementX = true;
        image.lockMovementY = true;
        this.canvas.add(image);
        this.canvas.centerObjectH(image);
        return this.canvas.centerObjectV(image);
      }, this)), false);
      reader = new FileReader();
      reader.onload = __bind(function(e) {
        console.log('reader');
        return img.src = e.target.result;
      }, this);
      return reader.readAsDataURL(file);
    };
    Photo.prototype.initAccessories = function() {
      var accessoriesContainer, index, li, list, src, _len, _results;
      accessoriesContainer = $('#accessories');
      accessoriesContainer.show();
      list = $('<ul></ul>');
      accessoriesContainer.append(list);
      _results = [];
      for (index = 0, _len = accessories.length; index < _len; index++) {
        src = accessories[index];
        li = $('<li><a href="#"><span>add</span><img src="img/accessories/' + src + '" width="70px" data-zindex="' + parseInt(index) + '" /></a></li>');
        list.append(li);
        _results.push(li.click(__bind(function(e) {
          var img;
          e.preventDefault();
          img = $('img', e.currentTarget);
          this.addAccessory(img.attr('src'), img.data('zindex'));
          return false;
        }, this)));
      }
      return _results;
    };
    Photo.prototype.addAccessory = function(url, zIndex) {
      return fabric.Image.fromURL(url, __bind(function(image) {
        image.setCoords();
        this.canvas.insertAt(image, zIndex + 1);
        this.canvas.centerObjectH(image);
        return this.canvas.centerObjectV(image);
      }, this));
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
