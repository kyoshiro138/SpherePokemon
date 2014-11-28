function MapManager() {
	this.Name = gameManager.Player.Name;
	this.Map = "";
	this.FrameRate = 60;
}

MapManager.prototype.StartMapEngine = function(map) {
	MapEngine(map,this.FrameRate);
}

MapManager.prototype.ChangeMap = function(map,fromTileX,fromTileY,toTileX,toTileY,layer) {
	if(IsPositionInsideTile(GetPersonX(this.Name),GetPersonY(this.Name),fromTileX,fromTileY))
	{
		ChangeMap(map);
		FlipScreen();
		//Abort(toTileX+ " " +toTileY);
		var x = GetCenterXPositionOfTile(toTileX,toTileY);
		var y = GetCenterYPositionOfTile(toTileX,toTileY);
		//Abort(x+ " " +y);
		gameManager.Player.ChangeMap(x,y,layer);
	}
}