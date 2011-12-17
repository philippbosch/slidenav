(function() {
  $(function() {
    var endEvent, log, moveEvent, nav, startEvent, touchSupport;
    nav = $('#slidenav');
    touchSupport = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    startEvent = touchSupport ? 'touchstart' : 'mousedown';
    endEvent = touchSupport ? 'touchend touchcancel touchleave' : 'mouseup mouseout';
    moveEvent = touchSupport ? 'touchmove' : 'mousemove';
    log = function(msg) {
      return $('#log').prepend("<li>" + msg + "</li>");
    };
    log(touchSupport ? 'touch support' : 'no touch support');
    nav.bind(startEvent, function(e) {
      e.preventDefault();
      nav.addClass('touched');
      log(e.type);
      return false;
    });
    nav.bind(endEvent, function(e) {
      e.preventDefault();
      if (!nav.is('.touched')) {
        return;
      }
      nav.removeClass('touched');
      log(e.type);
      return false;
    });
    return nav.bind(moveEvent, function(e) {
      e.preventDefault();
      if (!nav.is('.touched')) {
        return;
      }
      log(e.type);
      return false;
    });
  });
}).call(this);
