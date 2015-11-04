var $prompt = $('#prompt');
var $log = $('#log');
var purse = 10000;


var addLI = function(liText, liClass) {
	var $newLI = $('<li>');
	$newLI.text(liText);
	$newLI.addClass(liClass);
	$log.append($newLI);
};

var parsePrompt = function(promptText) {
	if (promptText === 'purse') {
		var response = 'ShylockBot pulls out his purse containing ' + purse + ' ducats';
		addLI(response, 'action');
	}
};

var enterPrompt = function(event) {
	if (event.keyCode !== 13) {
		return;
	}
	var promptText = $prompt.val();
	addLI(promptText, 'prompt');
	$prompt.val('');
	parsePrompt(promptText);
};

$prompt.on('keypress', enterPrompt);