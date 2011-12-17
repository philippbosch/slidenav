$ ->
    $el = $('#slidenav')
    $ul = $('ul', $el)
    innerWidth = $el.width() - parseInt($el.css('padding-left'),10) - parseInt($el.css('padding-right'),10)
    maxTranslateX = $ul.width() - innerWidth
    touchSupport = !!(('ontouchstart' of window) || window.DocumentTouch && document instanceof DocumentTouch)
    startEvent = if touchSupport then 'touchstart' else 'mousedown'
    endEvent = if touchSupport then 'touchend touchcancel touchleave' else 'mouseup mouseout'
    moveEvent = if touchSupport then 'touchmove' else 'mousemove'
    
    $el.data 'translateX', 0
    
    $el.bind startEvent, (e) ->
        e.preventDefault()
        $el.addClass('touched')
        $el.data('touchStartX', e.touches[0].clientX - parseInt($el.data('translateX'),10))
        return false
    
    $el.bind endEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        $el.removeClass('touched')
        $el.data('touchStartX', null)
        $el.data('translateX', $el.data('currentTranslateX'))
        return false
    
    $el.bind moveEvent, (e) ->
        e.preventDefault()
        return unless $el.is('.touched')
        translateX = e.touches[0].clientX - $el.data 'touchStartX'
        if translateX > 0
            translateX = 0
        if translateX < -maxTranslateX
            translateX = -maxTranslateX
        $ul.css('-webkit-transform', "translateX(#{translateX}px)")
        $el.data('currentTranslateX', translateX)
        return false
