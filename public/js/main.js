
class DiceParseError extends Error {
	constructor(token, idx) {
		if(typeof idx != 'undefined') {
			super("Unexpected token '" + token + "' at index " + idx);
		} else {
			super(token);
		}
	}
}

function parseDice(str) {
	// Initial sanity check (ha!) to prevent unnecessary parsing
	// You can use both w and d to designate dice
	if(!str || !str.match(/^( |w|d|\d|\+|\*|\(|\))+$/i)) throw new DiceParseError("Invalid rolling instruction '" + str + "'");

	str = str.replace(/ /g, ''); // Remove whitespaces

	var chars = str.split("");
	var currentToken = null;
	var previousToken = null;
	var currentIndent = 0;
	var termBuffer = "";

	var terms = [];

	// I do this with for because I like having the index variable right there
	for(var i = 0; i < chars.length; i++) {
		currentToken = chars[i];

		switch(currentToken) {
			case '(':
				if(previousToken && previousToken.match(/\d/)) throw new DiceParseError(previousToken, i);

				currentIndent++;
				break;
			case ')':
				currentIndent--;
				if(currentIndent < 0) throw new DiceParseError("Mismatched parentheses");
				break;
			case '+':
				break;
			case '-':
				break;
			case '*':
				break;
			case 'w':
			case 'd':
				if(previousToken && previousToken.match(/\)/)) throw new DiceParseError(previousToken, i);
				if(!termBuffer) termBuffer = 1; // d6 == 1d6
				termBuffer += "d"; // Normalize to 'd'
				
				break;
			default: // If I did it right those are numbers
				break;
		}
	}
	if(currentIndent > 0) throw new DiceParseError("Mismatched parentheses");
}

function rollDice(w, a) {
	if(!a) a = 1;
	var result = 0;
	for(var i = 0; i < a; i++) result += Math.ceil(Math.random() * w);
	return result;
}

$(function() {
	var $age = $('#age');
	var ageData = $config.ageData;
	$('.roll').click(function() {
		var $this = $(this);

		var stat = $(this).attr('data-stat');
		var result = 0;

		switch(stat) {
			case 'st':
			case 'ko':
			case 'ma':
			case 'er':
			case 'ge':
			case 'luck':
				result = 5 * rollDice(6, 3);
				break;
			case 'gr':
			case 'in':
			case 'bi':
				result = 5 * (6 + rollDice(6, 2));
				break;
		}

		if(result > $('#' + stat).val() && $('#' + stat).val() !== undefined) $('#' + stat).val(result).prop('readonly', true);
		$this.hide();
	});

	$('.confirmAge').click(function() {
		var $this = $(this);
		if(!checkStatsRolled()) {
			$('#ageDesc').empty().append('Bitte zuerst Werte auswürfeln!');
			return;
		}
		if($age.val() >= ageData.minAge && $age.val() <= ageData.maxAge) {
			$age.prop('readonly', true);
			$this.hide();

			var i = 0;
			while($age.val() > ageData.thresholds[i].max) i++;
			var characterAge = ageData.thresholds[i];

			for(var malusStat of characterAge.agemalus.malusStats) {
				$('.malus' + malusStat).toggle();
			}
			if(characterAge.luckBonusRoll) $('.luckBonusRoll').toggle();
			//TODO MALUS LOGIC + BI Upgrade Roll!
		}
	});

	$age.on('keyup', showAgeDesc);
	$age.click(showAgeDesc);
	
	function showAgeDesc() {
		$('#ageDesc').empty();

		if($age.val() < ageData.minAge || $age.val() > ageData.maxAge) {
			$('#ageDesc').append('Das Alter muss zwischen 15 und 89 jahren sein!');
			return;
		}
		var i = 0;
		while($age.val() > ageData.thresholds[i].max) i++;
		for(var val of ageData.thresholds[i].desc) {
			$('#ageDesc').append(val + '<br>');
		}
	}

	function checkStatsRolled() {
		var x = true;
		for(var stat in $config.statsData) {
			x = x && $('#' + stat).prop("readonly");
		}
		return x && $('#luck').prop("readonly");
	}
});


