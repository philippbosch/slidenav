(function() {
  $(function() {
    var $el, $ul, endEvent, innerWidth, maxTranslateX, moveEvent, startEvent, touchSupport;
    $el = $('#slidenav');
    $ul = $('ul', $el);
    innerWidth = $el.width() - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    maxTranslateX = $ul.width() - innerWidth;
    touchSupport = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    startEvent = touchSupport ? 'touchstart' : 'mousedown';
    endEvent = touchSupport ? 'touchend touchcancel touchleave' : 'mouseup mouseout';
    moveEvent = touchSupport ? 'touchmove' : 'mousemove';
    $el.data('translateX', 0);
    $el.bind(startEvent, function(e) {
      var clientX;
      e.preventDefault();
      $el.addClass('touched');
      clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      $el.data('touchStartX', clientX - parseInt($el.data('translateX'), 10));
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
      var clientX, translateX;
      e.preventDefault();
      if (!$el.is('.touched')) {
        return;
      }
      clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      translateX = clientX - $el.data('touchStartX');
      if (translateX > 0) {
        translateX = 0;
      }
      if (translateX < -maxTranslateX) {
        translateX = -maxTranslateX;
      }
      $ul.css('-webkit-transform', "translateX(" + translateX + "px)");
      $el.data('currentTranslateX', translateX);
      return false;
    });
  });
}).call(this);
