RequireScript("Functions.js");
RequireScript("SupportFunctions.js");
RequireScript("Player.js");
RequireScript("ConstantValues.js");
RequireScript("Character.js");
RequireScript("ActionManager.js");
RequireScript("GameManager.js");
RequireScript("WindowManager.js");
RequireScript("MapManager.js");
RequireScript("Setting.js");

var gameManager;
var windowManager;
var mapManager;

function game() {
	gameManager = new GameManager();
	gameManager.InitPlayer("Joe","HeroMaleWalk.rss");
	
	windowManager = new WindowManager("Joe");
	
	SetUpdateScript('UpdateScripts()');
	SetRenderScript('RenderScripts()');
	
	mapManager = new MapManager();
	mapManager.StartMapEngine("PalletTown.rmp");
}

function UpdateScripts() {
	DetectEntity();
	gameManager.Player.UpdateAction();
}
function RenderScripts() {
	var str = gameManager.Player.ToString();
	Debug(str);
	
	gameManager.Player.ActionManager.UpdateInteraction();
}
