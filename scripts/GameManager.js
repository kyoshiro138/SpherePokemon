function GameManager() {
	this.GameSetting = new Setting();
	this.GameSetting.LoadDefaultValues();
}

GameManager.prototype.InitPlayer = function(name,spriteset) {
	this.Player = new Player(name,spriteset);
	BindKey(this.GameSetting.KeyUp,"KeyPressed(gameManager.GameSetting.KeyUp)","KeyReleased(gameManager.GameSetting.KeyUp)");
	BindKey(this.GameSetting.KeyDown,"KeyPressed(gameManager.GameSetting.KeyDown)","KeyReleased(gameManager.GameSetting.KeyDown)");
	BindKey(this.GameSetting.KeyLeft,"KeyPressed(gameManager.GameSetting.KeyLeft)","KeyReleased(gameManager.GameSetting.KeyLeft)");
	BindKey(this.GameSetting.KeyRight,"KeyPressed(gameManager.GameSetting.KeyRight)","KeyReleased(gameManager.GameSetting.KeyRight)");
	BindKey(this.GameSetting.KeySwitch,"gameManager.Player.ToggleShoes()","");
	BindKey(this.GameSetting.KeyA,"gameManager.Player.Interact()","");
}