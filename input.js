var Input = (function() {
  var htmlInput = '\
    <section class="input-container" onselectstart="return false;">\
      <em class="input-label">金额</em>\
      <div class="input-bar">\
          <input class="input-input" type="text" readonly placeholder="输入金额">\
          <div class="input-fake"><span class="input-cursor">|</span></div>\
      </div>\
      <i class="input-clear"><span class="input-clear-icon"></span></i>\
    </section>';
  var htmlCurosr = '<span class="input-cursor">|</span>';
  return {
    initialize: function(options) {
      this.$root = options.root;
      this.$target = options.target;
      this.$target.html(htmlInput);

      this.maxLength = options.maxLength || 18;
      this._cursorIndex = 0;
      this._$input = $('.input-input');
      this._$fakeInput = $('.input-fake');
      this._$clear = $('.input-clear');
      this._$cursor = $('.input-cursor');

      this._$input.on('click', function(e) {
        this._onFocus(e);
      }.bind(this));
      this._$clear.on('click', function(e) {
        this._onClear();
      }.bind(this));
      this.$root.on('click', function(e) {
        // click other div, hide keyboard
        var $target = $(e.target);
        if ($target.hasClass('input-input') || $target.hasClass('input-fake') ||
          $target.hasClass('input-clear') || $target.hasClass('input-clear-icon')) {
          this._onFocus(e);
        } else {
          this._onBlur();
        }
      }.bind(this));

      this.blur();
      return this;
    },
    put: function(val) {
      var num = this._$input.val();
      if (num.length < this.maxLength) {
        var preStr = num.substr(0, this._cursorIndex) + val.toString();
        var endStr = num.substr(this._cursorIndex);
        num = num.replace(/\s*/g, '');
        num = preStr + endStr;
        this._$input.val(num);
        this._$fakeInput.html(preStr + htmlCurosr);
        this._$fakeInput.show();
        this._$clear && this._$clear.show();
        this._cursorIndex++;
        this._onChange && this._onChange(num);
      }
    },
    del: function() {
      if (this._cursorIndex > 0) {
        var num = this._$input.val();
        var preStr = num.substr(0, this._cursorIndex - 1);
        var endStr = num.substr(this._cursorIndex);
        num = num.replace(/\s*/g, "");
        num = preStr + endStr;
        this._$input.val(num);
        this._$fakeInput.html(preStr + htmlCurosr);
        this._$fakeInput.show();
        this._$clear && this._$clear.show();
        this._cursorIndex--;
        this._onChange && this._onChange(num);
      }
    },
    _showCursor: function(e) {
      var left = this._$input.offset().left;
      var x = e.x || e.clientX || e.pageX;
      var val = this._$input.val();
      var cursorIndex = (x - left > 0) ? parseInt((x - left) / 8) : 0;
      cursorIndex = cursorIndex >= val.length ? val.length : cursorIndex;
      this._cursorIndex = cursorIndex;
      this._$fakeInput.html(val.substr(0, cursorIndex) + htmlCurosr);
    },
    clear: function() {
      this._$input.val('');
      this._$fakeInput.html(htmlCurosr);
      this._cursorIndex = 0;
    },
    focus: function() {
      this._$clear && this._$clear.show();
      this._$fakeInput.show();
      // blur other input
      this.$root.find('input:not(.input-input)').blur();
    },
    blur: function() {
      this._$clear && this._$clear.hide();
      this._$fakeInput.hide();
    },
    value: function() {
      return this._$input.val();
    },
    _onChange: function(num) {
      this.onChange && this.onChange(num);
    },
    _onClear: function() {
      console.log('clear');
      this.clear();
      this._onChange && this._onChange('');
    },
    _onFocus: function(e) {
      this.focus();
      this._showCursor(e);
      this.onFocus && this.onFocus();
    },
    _onBlur: function() {
      this.blur();
      this.onBlur & this.onBlur();
    },
    offset: function() {
      return this._$input.offset();
    },
    height: function() {
      return this._$input.height();
    }
  }
}());