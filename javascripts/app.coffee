$ ->
    nav = $('#slidenav')
    
    log = (msg) ->
        $('#log').prepend("<li>#{msg}</li>")
    
    nav.bind 'touchstart touchend touchcancel touchleave touchmove', (e) ->
        log e.type