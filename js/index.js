var councilmembers = require(['require', './js/modules/councilmembers.js']);
var votingHistory = require(['require', './js/modules/votingHistory.js']);

// Handle range input behavior
function updateTextInput(val) {
  document.getElementById('js-range-text-input').value=val;
}
function updateRangeVal(val) {
  document.getElementById('js-range').value=val;
}
