(function() {
  $(function() {
    var log, nav;
    nav = $('#slidenav');
    log = function(msg) {
      return $('#log').prepend("<li>" + msg + "</li>");
    };
    nav.bind('touchstart', function(e) {
      return $(this).addClass('touched');
    });
    return nav.bind('touchend touchcancel touchleave', function(e) {
      return $(this).removeClass('touched');
    });
  });
}).call(this);
