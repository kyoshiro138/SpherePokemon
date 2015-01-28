function MapManager() {
	this.Name = gameManager.Player.Name;
	this.Map = "";
	this.FrameRate = 60;
}

MapManager.prototype.StartMapEngine = function(map) {
	MapEngine(map,this.FrameRate);
}

MapManager.prototype.ChangeMap = function(map,tileX,tileY,layer) {
		ChangeMap(map);
		FlipScreen();
		
		var x = GetCenterXPositionOfTile(tileX,tileY);
		var y = GetCenterYPositionOfTile(tileX,tileY);
		
		SetPersonX(this.Name,x);
		SetPersonY(this.Name,y);
		SetPersonLayer(this.Name,layer);
}