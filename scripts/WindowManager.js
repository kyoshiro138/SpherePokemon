function WindowManager(playerName) {
	this.PlayerName = playerName;
	
	this.DebugWindowStyle = LoadWindowStyle("window_debug.rws")
	this.DebugFont = LoadFont("pokemon_font.rfn");
	this.DebugFont.setColorMask(COLOR.WHITE);
	
	this.WindowStyle = LoadWindowStyle("window1.rws");
	this.Image = LoadImage("window_arrow_down.png");
	this.Font = LoadFont("pokemon_font.rfn");
	this.Font.setColorMask(COLOR.BLACK);
	
	this.DebugWindowVisible = true;
}

WindowManager.prototype.ShowSign = function(signPosX,signPosY,text) {
	var width = this.Font.getStringWidth(text);
	var x = MapToScreenX(GetPersonLayer(this.PlayerName),signPosX*TILE_SIZE.WIDTH);
	var y = MapToScreenY(GetPersonLayer(this.PlayerName),(signPosY-2)*TILE_SIZE.HEIGHT);
	var windowX = x + (TILE_SIZE.WIDTH/2) - (width/2);
	
	this.WindowStyle.drawWindow(windowX,y,width,TILE_SIZE.HEIGHT);
	this.Image.blit(x,y+TILE_SIZE.HEIGHT);

	this.Font.drawTextBox(windowX, y, width, TILE_SIZE.HEIGHT, 0, text);
}

WindowManager.prototype.ShowDebug = function(text) {
	if(this.DebugWindowVisible) {
		var line = 4;
		var windowWidth = SCREEN_SIZE.WIDTH - 32;
		var windowHeight = this.DebugFont.getHeight()*line;
		var windowX = 16;
		var windowY = SCREEN_SIZE.HEIGHT - (16 + windowHeight);
		
		this.DebugWindowStyle.drawWindow(windowX, windowY, windowWidth, windowHeight);
		this.DebugFont.drawTextBox(windowX, windowY, windowWidth, windowHeight, 0, text);
	}
}

WindowManager.prototype.ShowDialog = function(speaker,text) {
	var layer = GetPersonLayer(speaker);
	var x = MapToScreenX(layer,GetPersonX(speaker));
	var y = MapToScreenY(layer,GetPersonY(speaker));
	
	var windowWidth = 300;
	var windowHeight = this.Font.getStringHeight(text,windowWidth);
	var windowX = x - (windowWidth/2);
	var windowY = y - (TILE_SIZE.HEIGHT * 2) - windowHeight;
	this.WindowStyle.drawWindow(windowX,windowY,windowWidth,windowHeight);
	
	var imageX = x - (TILE_SIZE.WIDTH / 2);
	var imageY = y - (TILE_SIZE.HEIGHT * 2);
	this.Image.blit(imageX,imageY);

	this.Font.drawTextBox(windowX, windowY, windowWidth, windowHeight, 0, text);
}