RequireScript("Functions.js");
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
	gameManager.Player.UpdateAction();
}
function RenderScripts() {
	var str = gameManager.Player.ToString();
	Debug(str);
	
	if(gameManager.Player.CanInteract) {
			ExecuteTriggerAt(gameManager.Player.Name,gameManager.Player.ActionManager.Direction);
	}
}
