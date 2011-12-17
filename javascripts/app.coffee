$ ->
    nav = $('#slidenav')
    touchSupport = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
    startEvent = if touchSupport then 'touchstart' else 'mousedown'
    endEvent = if touchSupport then 'touchend touchcancel touchleave' else 'mouseup mouseout'
    moveEvent = if touchSupport then 'touchmove' else 'mousemove'
    
    log = (msg) ->
        $('#log').prepend("<li>#{msg}</li>")
    
    nav.bind startEvent, (e) ->
        nav.addClass 'touched'
        log e.type
    
    nav.bind endEvent, (e) ->
        return unless nav.is('.touched')
        nav.removeClass 'touched'
        log e.type
    
    nav.bind moveEvent, (e) ->
        return unless nav.is('.touched')
        log e.type
