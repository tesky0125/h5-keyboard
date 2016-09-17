var Keyboard = (function() {
  var htmlKeyboard = '\
    <section class="keyboard-container" onselectstart="return false;">\
        <div class="keyboard-bar"><span class="keyboard-btn-ok">完成</span></div>\
        <ul class="keyboard-list">\
            <li data-num="1" class="keyboard-item-num">1</li>\
            <li data-num="2" class="keyboard-item-num">2</li>\
            <li data-num="3" class="keyboard-item-num">3</li>\
            <li data-num="4" class="keyboard-item-num">4</li>\
            <li data-num="5" class="keyboard-item-num">5</li>\
            <li data-num="6" class="keyboard-item-num">6</li>\
            <li data-num="7" class="keyboard-item-num">7</li>\
            <li data-num="8" class="keyboard-item-num">8</li>\
            <li data-num="9" class="keyboard-item-num">9</li>\
            <li data-num="." class="keyboard-item-num keyboard-hack">•</li>\
            <li data-num="0" class="keyboard-item-num">0</li>\
            <li class="keyboard-item-num keyboard-item-del"><span class="keyboard-icon-del"></span></li>\
        </ul>\
    </section><div class="keyboard_aid_div" style="height: 300px; bottom: 0px;"></div>';

  return {
    initialize: function(options) {
      console.log('Keyboard');
      this.$root = options.root;
      this.$root.after(htmlKeyboard);

      this.input = options.input;
      this._$keyboard = $('.keyboard-container');
      this._$keyboardAid = $('.keyboard_aid_div');

      //bind item click event
      this._$keyboard.find('.keyboard-list').on('click', function(e) {
        var $target = $(e.target);
        if ($target.hasClass("keyboard-item-num")) {
          if ($target.attr("data-num")) {
            var num = $target.attr('data-num');
            this._onNumClick(num);
          }
        }
      }.bind(this));

      this._$keyboard.find('.keyboard-btn-ok').on('click', function(e) {
        this._onOkClick()
      }.bind(this));

      this._$keyboard.find('.keyboard-item-del').on('click', function(e) {
        this._onDelClick();
      }.bind(this));

      window.addEventListener('popstate', function(e) {
        if (history.state) {
          this.hide();
          this.input.blur();
        }
      }.bind(this), false);

      this.hide();
      return this;
    },
    show: function() {
      this._$keyboard.show().animate({
        bottom: '0px'
      }, 250);
      this._$keyboardAid.show();
      setTimeout(function() {
        this._scrollToVisible();
      }.bind(this), 500);
    },
    hide: function() {
      this._$keyboard.css({
        bottom: '-300px'
      }).hide();
      this._$keyboardAid.hide();
    },
    _scrollToVisible: function() {
      var inputTop = this.input.offset().top;
      var inputHeight = this.input.height();
      var innerHeight = window.innerHeight;
      var keyboardHeight = this._$keyboard.height();
      if (innerHeight - inputTop < keyboardHeight) {
        var scrollTop = inputTop - (innerHeight - keyboardHeight) + inputHeight + window.screenTop;
        window.scrollTo(0, parseInt(scrollTop));
      }
    },
    _onNumClick: function(num) {
      console.log(num);
      this.input.put(num);
    },
    _onDelClick: function() {
      console.log('btn-del');
      this.input.del();
    },
    _onOkClick: function() {
      console.log('btn-ok');
      this.hide();
      this.input.blur();
    }
  };
}());