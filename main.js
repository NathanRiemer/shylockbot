var $prompt = $('#prompt');
var $log = $('#log');
var purse = 10000;
var loans = {};


var addLI = function(liText, liClass) {
	var $newLI = $('<li>');
	$newLI.text(liText);
	$newLI.addClass(liClass);
	$log.append($newLI);
};

var parsePrompt = function(promptText) {
	if (promptText.indexOf(' ') === -1) {
		var cmd = promptText;
	} else {
		var promptArray = promptText.split(' ')
		var cmd = promptArray[0];
	}

	switch (cmd) {
		case 'purse':
			var response = 'ShylockBot pulls out his purse containing ' + purse + ' ducats';
			addLI(response, 'action');
			break;

		case 'loan':
			var person = promptArray[1];
			var amount = parseInt(promptArray[2]);
			if (loans[person]) {
				loans[person] += amount;
			} else {
				loans[person] = amount;
			}
			purse -= amount;
			var response = 'ShylockBot gives ' + person + ' ' + amount + ' ducats';
			addLI(response, 'action');
			break;

		case 'ledger':
			addLI('ShylockBot pulls out his ledger', 'action');
			for (var person in loans) {
				var line = person + ' owes me ' + loans[person] + ' ducats';
				addLI(line, 'quote');
			}
			break;

		default:
			break;
	}
};

var enterPrompt = function(event) {
	if (event.keyCode !== 13) {
		return;
	}
	var promptText = $prompt.val();
	addLI(promptText, 'command');
	$prompt.val('');
	parsePrompt(promptText);
};

$prompt.on('keypress', enterPrompt);