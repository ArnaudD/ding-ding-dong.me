
accessories = [
  'hair1.png'
  'hair2.png'
  'mouth1.png'
  'glasses1.png'
  'glasses2.png'
]


class Photo
  constructor: (file) ->
    $('#photo').show()
    @initCanvas file
    @initAccessories()

  initCanvas: (file) ->
    img = document.createElement 'img'
    img.addEventListener 'load', ((e) => 
      width  = (700 - 40)
      height = (width / img.width) * img.height

      @canvas = oCanvas.create
        canvas: "#photo-canvas"
      @canvas.width  = width
      @canvas.height = height
      image  = @canvas.display.image
        x: 0
        y: 0
        width: width
        height: height
        image: img
      @canvas.addChild image
    ), false

    reader = new FileReader()
    reader.onload = (e) =>
      console.log 'reader'
      img.src = e.target.result
    reader.readAsDataURL file

  initAccessories: () ->
    accessoriesContainer = $('#accessories')
    accessoriesContainer.show()
    list = $('<ul></ul>')
    accessoriesContainer.append list

    for item in accessories
      li = $('<li><a href="#"><span>add</span><img src="img/accessories/'+item+'" width="70px" /></a></li>')
      list.append li
      li.click (e) =>
        e.preventDefault()
        @addAccessory $('img', e.currentTarget).attr 'src'
        false

  addAccessory: (url) ->
    image  = @canvas.display.image
      x: 0
      y: 0
      image: url
    @canvas.addChild image
    image.dragAndDrop()


class FileHandler
  constructor: () ->
    @dropzone = $('#dropzone').get 0
    @initEventHandlers()

  initEventHandlers: () ->
    @dropzone.ondragenter = @onFileDragEnter
    @dropzone.ondragover  = @onFileDragEnter
    @dropzone.ondragleave = @onFileDragLeave
    @dropzone.ondragend   = @onFileDragLeave
    @dropzone.ondrop      = @onFileDrop

  onFileDragEnter: (e) ->
    @className = 'file-hover'
    false

  onFileDragLeave: (e) ->
    @className = ''
    false

  onFileDrop: (e) ->
    e.preventDefault()
    for file in e.dataTransfer.files
      if file.type.indexOf('image') != -1
        @className = ''
        $(@).hide()
        new Photo file
        return false
        
    alert 'No image found, try again !'
    false


$(document).ready ->
  new FileHandler

