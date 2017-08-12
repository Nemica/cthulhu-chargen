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
