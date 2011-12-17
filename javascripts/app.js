(function() {
  $.fn.intdata = function(key) {
    return parseInt($(this).data(key), 10);
  };
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
    $el.data('touchStartX', 0);
    $el.bind(startEvent, function(e) {
      var clientX;
      e.preventDefault();
      $el.addClass('touched');
      clientX = touchSupport ? e.touches[0].clientX : e.clientX;
      $el.data('touchStartX', clientX - $el.intdata('translateX'));
      return false;
    });
    $el.bind(endEvent, function(e) {
      e.preventDefault();
      if (!$el.is('.touched')) {
        return;
      }
      $el.removeClass('touched');
      $el.data('touchStartX', 0);
      $el.data('translateX', $el.intdata('currentTranslateX'));
      return false;
    });
    return $el.bind(moveEvent, function(e) {
      var clientX, translateX;
      e.preventDefault();
      if (!$el.is('.touched')) {
        return;
      }
      clientX = touchSupport ? e.touches[0].clientX : e.clientX;
      translateX = clientX - $el.intdata('touchStartX');
      if (translateX > 0) {
        translateX = 0;
      }
      if (translateX < -maxTranslateX) {
        translateX = -maxTranslateX;
      }
      $ul[0].style[Modernizr.prefixed('transform')] = "translateX(" + translateX + "px)";
      $el.data('currentTranslateX', translateX);
      return false;
    });
  });
}).call(this);
