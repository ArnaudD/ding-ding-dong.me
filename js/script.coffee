
#
# TODO 
#  - refactor, it's quite ugly !
#  - make object removeable
#  - share on social networks
#  - clear canvas
#

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
    $('#share').show()
    $('#download a').click (e) =>
      e.preventDefault()
      @canvas.deactivateAll()
      window.open @canvas.toDataURL 'png'
      


  initCanvas: (file) ->
    img = document.createElement 'img'
    img.addEventListener 'load', ((e) => 
      width  = (700 - 40)
      height = (width / img.width) * img.height

      @canvas = new fabric.Element 'photo-canvas'
      @canvas.setWidth  width
      @canvas.setHeight height
      image = new fabric.Image img
      image.scaleToWidth width
      image.scaleToHeight height
      image.lockRotation  = true
      image.lockScalingX  = true
      image.lockScalingY  = true
      image.lockMovementX = true
      image.lockMovementY = true
      @canvas.add image
      @canvas.centerObjectH image
      @canvas.centerObjectV image
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

    for src, index in accessories
      li = $('<li><a href="#"><span>add</span><img src="img/accessories/'+src+'" width="70px" data-zindex="'+parseInt(index)+'" /></a></li>')
      list.append li
      li.click (e) =>
        e.preventDefault()
        img = $('img', e.currentTarget)
        @addAccessory (img.attr 'src'), img.data('zindex')
        false

  addAccessory: (url, zIndex) ->
    fabric.Image.fromURL url, (image) =>
      image.setCoords()
      @canvas.insertAt image, zIndex + 1
      @canvas.centerObjectH image
      @canvas.centerObjectV image

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

