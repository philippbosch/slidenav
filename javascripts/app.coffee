$ ->
    $el = $('#slidenav')
    $ul = $('ul', $el)
    touchSupport = !!(('ontouchstart' of window) || window.DocumentTouch && document instanceof DocumentTouch)
    startEvent = if touchSupport then 'touchstart' else 'mousedown'
    endEvent = if touchSupport then 'touchend touchcancel touchleave' else 'mouseup mouseout'
    moveEvent = if touchSupport then 'touchmove' else 'mousemove'
    
    $el.data 'translateX', 0
    
    $el.bind startEvent, (e) ->
        e.preventDefault()
        $el.addClass 'touched'
        $el.data 'touchStartX', e.touches[0].clientX
        return false
    
    $el.bind endEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        $el.removeClass 'touched'
        $el.data 'touchStartX', null
        return false
    
    $el.bind moveEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        diff = e.touches[0].clientX - $el.data 'touchStartX'
        translateX = diff
        console.log diff, translateX
        $ul.css('-webkit-transform', "translateX(#{translateX}px)")
        $el.data 'translateX', translateX
        return false
