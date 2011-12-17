(function() {
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  $(function() {
    var endEvent, log, moveEvent, nav, startEvent, touchSupport;
    nav = $('#slidenav');
    touchSupport = (__indexOf.call(window, 'ontouchstart') >= 0) || window.DocumentTouch && document instanceof DocumentTouch;
    startEvent = touchSupport ? 'touchstart' : 'mousedown';
    endEvent = touchSupport ? 'touchend touchcancel touchleave' : 'mouseup mouseout';
    moveEvent = touchSupport ? 'touchmove' : 'mousemove';
    log = function(msg) {
      return $('#log').prepend("<li>" + msg + "</li>");
    };
    nav.bind(startEvent, function(e) {
      nav.addClass('touched');
      return log(e.type);
    });
    nav.bind(endEvent, function(e) {
      if (!nav.is('.touched')) {
        return;
      }
      nav.removeClass('touched');
      return log(e.type);
    });
    return nav.bind(moveEvent, function(e) {
      if (!nav.is('.touched')) {
        return;
      }
      return log(e.type);
    });
  });
}).call(this);
