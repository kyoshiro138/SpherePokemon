function WindowManager(playerName) {
	this.PlayerName = playerName;
	this.WindowStyle = LoadWindowStyle("window1.rws");
	this.Image = LoadImage("window_arrow_down.png");
	this.Font = LoadFont("pokemon_font.rfn");
}

WindowManager.prototype.ShowSign = function(signPosX,signPosY,text) {
	if(gameManager.Player.ActionManager.Direction == DIRECTION.NORTH)
	{
		var width = this.Font.getStringWidth(text);
		var x = MapToScreenX(GetPersonLayer(this.PlayerName),signPosX*TILE_SIZE.WIDTH);
		var y = MapToScreenY(GetPersonLayer(this.PlayerName),(signPosY-2)*TILE_SIZE.HEIGHT);
		var windowX = x + (TILE_SIZE.WIDTH/2) - (width/2);
		
		this.WindowStyle.drawWindow(windowX,y,width,TILE_SIZE.HEIGHT);
		this.Image.blit(x,y+TILE_SIZE.HEIGHT);
			
		this.Font.drawTextBox(windowX, y, width, TILE_SIZE.HEIGHT, 0, text);
	}
}

WindowManager.prototype.ShowDebug = function(text) {
	var line = 2;
	var height = this.Font.getHeight()*line;

	this.WindowStyle.drawWindow(8,8,SCREEN_SIZE.WIDTH-16,height);	
	this.Font.drawTextBox(8, 8, SCREEN_SIZE.WIDTH-16, height, 0, text);
}