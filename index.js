(function() {
  var input = Input.initialize({
    root: $('#app-root'),
    target: $('.keyboard-input')
  });
  input.onChange = function(val) {
    console.log(val);
  };
  input.onFocus = function() {
    keyboard.show();
  };
  input.onBlur = function() {
    keyboard.hide();
    console.log(input.value());
  };

  var keyboard = Keyboard.initialize({
    root: $('#app-root'),
    input: input,
  });
}());