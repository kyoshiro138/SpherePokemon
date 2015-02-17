function GetSentenceIdByDialog(dialog) {
	switch(dialog) {
		case "DIALOG_TEST": return 1;
		default: return -1;
	}
}

function GetNextSentenceId(previousSentenceId) {
	switch(previousSentenceId) {
		case 1: return 2;
		default: return -1;
	}
}

function IsPlayerSpeaking(sentenceId) {
	switch(sentenceId) {
		case 1:
			return true;
		default:
			return false;
	}
}

function IsLastSentence(sentenceId) {
	switch(sentenceId) {
		case 1:
			return false;
		default:
			return true;
	}
}

function GetSentence(sentenceId) {
	switch(sentenceId) {
		case 1: return "Hello!";
		case 2: return "What's up?";
		default: return "Unknow sentence"; // case -1
	}
}
