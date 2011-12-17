(function() {
  $(function() {
    var $el, $ul, endEvent, moveEvent, startEvent, touchSupport;
    $el = $('#slidenav');
    $ul = $('ul', $el);
    touchSupport = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    startEvent = touchSupport ? 'touchstart' : 'mousedown';
    endEvent = touchSupport ? 'touchend touchcancel touchleave' : 'mouseup mouseout';
    moveEvent = touchSupport ? 'touchmove' : 'mousemove';
    $el.data('translateX', 0);
    $el.bind(startEvent, function(e) {
      e.preventDefault();
      $el.addClass('touched');
      $el.data('touchStartX', e.touches[0].clientX - parseInt($el.data('translateX'), 10));
      return false;
    });
    $el.bind(endEvent, function(e) {
      e.preventDefault();
      if (!$el.is('.touched')) {
        return;
      }
      $el.removeClass('touched');
      $el.data('touchStartX', null);
      $el.data('translateX', $el.data('currentTranslateX'));
      return false;
    });
    return $el.bind(moveEvent, function(e) {
      var diff, translateX;
      e.preventDefault();
      if (!$el.is('.touched')) {
        return;
      }
      diff = e.touches[0].clientX - $el.data('touchStartX');
      translateX = diff;
      console.log(diff, translateX);
      $ul.css('-webkit-transform', "translateX(" + translateX + "px)");
      $el.data('currentTranslateX', translateX);
      return false;
    });
  });
}).call(this);
