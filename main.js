var $prompt;
var $log;
var purse = 10000;
var ledger = {};
var interestRate = 50;


var addLI = function(liText, liClass) {
	var $newLI = $('<li>');
	$newLI.text(liText);
	$newLI.addClass(liClass);
	$log.append($newLI);
	$log.scrollTop($log.prop('scrollHeight'));
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
			if (ledger[person]) {
				ledger[person] += amount;
			} else {
				ledger[person] = amount;
			}
			purse -= amount;
			var response = 'ShylockBot gives ' + person + ' ' + amount + ' ducats';
			addLI(response, 'action');
			break;

		case 'ledger':
			addLI('ShylockBot pulls out his ledger', 'action');
			for (var person in ledger) {
				var line = person + ' owes me ' + ledger[person] + ' ducats';
				addLI(line, 'quote');
			}
			break;

		case 'collect':
			if (promptArray[1] === 'interest') {
				var response = 'ShylockBot collects interest at ' + interestRate + '%';
				addLI(response, 'action');
				for (var person in ledger) {
					ledger[person] *= ((100 +interestRate) / 100);
					var line = person + ' now owes me ' + ledger[person] + ' ducats';
					addLI(line, 'quote');
				}
			} else {
				var amount = parseInt(promptArray[1]);
				var person = promptArray[4];
				if (ledger[person]) {
					addLI('ShylockBot opens his purse', 'action');
					ledger[person] -= amount;
					purse += amount;
				}
			}
			break;

		case 'set':
			var newInterestrate = parseInt(promptArray[3]);
			var response = 'Shylock adjusts his interest rate from ' + interestRate + '% to ' + newInterestrate + '%';
			addLI(response, 'action');
			interestRate = newInterestrate;
			break;
		case 'antisemitism':
			addLI('Most definitely', 'quote');
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

// $prompt.on('keypress', enterPrompt);

$(document).ready(function() {
	$prompt = $('#prompt');
	$log = $('#log');

	$prompt.on('keypress', enterPrompt);
});
