var councilmembers = require(['require', './js/modules/councilmembers.js']);

// Handle range input behavior
function updateTextInput(val) {
  document.getElementById('js-range-text-input').value=val;
}
function updateRangeVal(val) {
  document.getElementById('js-range').value=val;
}
