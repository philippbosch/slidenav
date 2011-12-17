$.fn.intdata = (key) ->
    parseInt($(this).data(key),10)

$ ->
    $el = $('#slidenav')
    $ul = $('ul', $el)
    innerWidth = $el.width() - parseInt($el.css('padding-left'),10) - parseInt($el.css('padding-right'),10)
    maxTranslateX = $ul.width() - innerWidth
    touchSupport = !!(('ontouchstart' of window) || window.DocumentTouch && document instanceof DocumentTouch)
    startEvent = if touchSupport then 'touchstart' else 'mousedown'
    endEvent = if touchSupport then 'touchend touchcancel touchleave' else 'mouseup mouseout'
    moveEvent = if touchSupport then 'touchmove' else 'mousemove'
    
    $el.data('translateX', 0)
    $el.data('touchStartX', 0)
    
    $el.bind startEvent, (e) ->
        e.preventDefault()
        $el.addClass('touched')
        clientX = if touchSupport then e.touches[0].clientX else e.clientX
        $el.data('touchStartX', clientX - $el.intdata('translateX'))
        return false
    
    $el.bind endEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        $el.removeClass('touched')
        $el.data('touchStartX', 0)
        $el.data('translateX', $el.intdata('currentTranslateX'))
        return false
    
    $el.bind moveEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        clientX = if touchSupport then e.touches[0].clientX else e.clientX
        translateX = clientX - $el.intdata('touchStartX')
        if translateX > 0
            translateX = 0
        if translateX < -maxTranslateX
            translateX = -maxTranslateX
        $ul[0].style[Modernizr.prefixed('transform')] = "translateX(#{translateX}px)"
        $el.data('currentTranslateX', translateX)
        return false
