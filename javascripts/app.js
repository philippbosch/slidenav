(function() {
  $(function() {
    var log, nav;
    nav = $('#slidenav');
    log = function(msg) {
      return $('#log').prepend("<li>" + msg + "</li>");
    };
    return nav.bind('touchstart touchend touchcancel touchleave touchmove', function(e) {
      return log(e.type);
    });
  });
}).call(this);
