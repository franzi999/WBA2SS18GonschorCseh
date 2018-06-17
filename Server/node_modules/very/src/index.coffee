domEventsList = [
  'Abort', 'Blur', 'CanPlay', 'CanPlayThrough', 'Change', 'Click', 'ContextMenu',
  'Copy', 'CueChange', 'Cut', 'DblClick', 'Drag', 'DragEnd', 'DragEnter',
  'DragLeave', 'DragOver', 'DragStart', 'Drop', 'DurationChange', 'Emptied',
  'Ended', 'Error', 'Focus', 'Input', 'Invalid', 'KeyDown', 'KeyPress', 'KeyUp',
  'LoadedData', 'LoadedMetaData', 'LoadStart', 'MouseDown', 'MouseMove', 'MouseOut',
  'MouseOver', 'MouseUp', 'Paste', 'Pause', 'Play', 'Playing', 'Progress',
  'RateChange', 'Reset', 'Scroll', 'Search', 'Seeked', 'Seeking', 'Select', 'Show',
  'Stalled', 'Submit', 'Suspend', 'TimeUpdate', 'Toggle', 'VolumeChange', 'Waiting',
  'Wheel'
]

very = (object, element) ->
  list = domEventsList.filter((item) -> object["on#{item}"]?)

  removeEventListeners =
    list.map (item) ->
      lowerCaseName = item.toLowerCase()
      boundFunction = object["on#{item}"].bind(object)

      element.addEventListener(lowerCaseName, boundFunction)
      -> element.removeEventListener(lowerCaseName, boundFunction)

  -> removeEventListeners.forEach (fn) -> fn()

if module?.exports?
  module.exports = very
else
  @very = very
