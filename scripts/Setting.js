function Setting() {
	
}

Setting.prototype.LoadDefaultValues = function() {
	this.KeyUp = GetPlayerKey(PLAYER_1, PLAYER_KEY_UP);
	this.KeyDown = GetPlayerKey(PLAYER_1, PLAYER_KEY_DOWN);
	this.KeyLeft = GetPlayerKey(PLAYER_1, PLAYER_KEY_LEFT);
	this.KeyRight = GetPlayerKey(PLAYER_1, PLAYER_KEY_RIGHT);
	this.KeyA = GetPlayerKey(PLAYER_1, PLAYER_KEY_A);
	this.KeyB = GetPlayerKey(PLAYER_1, PLAYER_KEY_B);
	this.KeyX = GetPlayerKey(PLAYER_1, PLAYER_KEY_X);
	this.KeyY = GetPlayerKey(PLAYER_1, PLAYER_KEY_Y);
	this.KeyMenu = GetPlayerKey(PLAYER_1, PLAYER_KEY_MENU);
	
	this.KeySwitch = KEY_R;
}