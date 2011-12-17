$ ->
    nav = $('#slidenav')
    touchSupport = !!(('ontouchstart' of window) || window.DocumentTouch && document instanceof DocumentTouch)
    startEvent = if touchSupport then 'touchstart' else 'mousedown'
    endEvent = if touchSupport then 'touchend touchcancel touchleave' else 'mouseup mouseout'
    moveEvent = if touchSupport then 'touchmove' else 'mousemove'
    
    log = (msg) ->
        $('#log').prepend("<li>#{msg}</li>")
    
    log(if touchSupport then 'touch support' else 'no touch support')
    
    nav.bind startEvent, (e) ->
        nav.addClass 'touched'
        log e.type
        return false
    
    nav.bind endEvent, (e) ->
        return unless nav.is('.touched')
        nav.removeClass 'touched'
        log e.type
        return false
    
    nav.bind moveEvent, (e) ->
        return unless nav.is('.touched')
        log e.type
        return false
