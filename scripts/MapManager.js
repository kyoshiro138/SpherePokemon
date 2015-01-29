EvaluateSystemScript("timer.js");

function MapManager() {
	this.Name = gameManager.Player.Name;
	this.Map = "";
	this.FrameRate = 60;
	
	this.MapFadingTime = 1 * 1000;
	this.StartTime = 0;
	this.WillLeaveMap = false;
	this.WillEnterMap = false;
}

MapManager.prototype.UpdateScripts = function() {
	TriggerEnterMap();
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
	
	this.WillEnterMap = true;
}

MapManager.prototype.FadeIn = function() {
	var date = new Date();
	
	if(this.StartTime == 0) {
		this.WillLeaveMap = false;
		this.StartTime = date.getTime();
	}
	
	var timePassed = date.getTime() - this.StartTime;
	var alphaValue = (timePassed / this.MapFadingTime) * 255;
	alphaValue = alphaValue > 255 ? 255 : alphaValue;
	
	var color = CreateColor(0,0,0,alphaValue);
	
	ApplyColorMask(color);
	
	if(timePassed > this.MapFadingTime) {
		this.StartTime = 0;
		this.WillLeaveMap = true;
	}
}

MapManager.prototype.FadeOut = function() {
	var date = new Date();

	if(this.StartTime == 0) {
		this.StartTime = date.getTime();
	}
	
	var timePassed = date.getTime() - this.StartTime;
	var alphaValue = 255 - ((timePassed / this.MapFadingTime) * 255);
	alphaValue = alphaValue < 0 ? 0 : alphaValue;
	
	var color = CreateColor(0,0,0,alphaValue);
	ApplyColorMask(color);
	
	if(timePassed > this.MapFadingTime) {
		this.StartTime = 0;
		this.WillEnterMap = false;
	}
}