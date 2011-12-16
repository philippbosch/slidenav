$ ->
    nav = $('#slidenav')
    
    log = (msg) ->
        $('#log').prepend("<li>#{msg}</li>")
    
    nav.bind 'touchstart', (e) ->
        $(this).addClass 'touched'
    
    nav.bind 'touchend touchcancel touchleave', (e) ->
        $(this).removeClass 'touched'
