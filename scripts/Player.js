function Player(name,spriteset) {
	this.inheritFrom = Character;
	this.inheritFrom(name,spriteset);
	
	this.CanInteract = false;
	this.CanOpenDoor = true;
	this.CanCloseDoor = false;
	this.DoorTileId = -1;
	this.DoorTileX = -1;
	this.DoorTileY = -1;
	this.CloseDoorMinDistance=20;
}

Player.prototype.Initialize = function(name,spriteset) {
	CreatePerson(name,spriteset,false);
	AttachCamera(name);
	AttachInput(name);
}

Player.prototype.ToString = function() {
	var str = "Player: [Name=" + this.Name + "]";
	str += " [Direction=" + this.ActionManager.Direction + "]";
	str += " [X=" + GetPersonX(this.Name) + "]";
	str += " [Y=" + GetPersonY(this.Name) + "]\n";
	str += " [Distance="+GetDistance(GetCenterXPositionOfTile(this.DoorTileX,this.DoorTileY),GetCenterYPositionOfTile(this.DoorTileX,this.DoorTileY),GetPersonX(this.Name),GetPersonY(this.Name))+"]";
	
	return str;
}

Player.prototype.UpdateAction = function() {
	this.ActionManager.Update();
	
	if(IsTriggerExisted(this.Name,this.ActionManager.Direction)) {
			this.CanInteract = true;
	} else {
		if(this.CanInteract) {
			this.CanInteract = false;
		}
		
		this.CloseDoor();
	}
}

Player.prototype.ToggleShoes = function() {
	this.ActionManager.ToggleRun();
}

Player.prototype.Interact = function() {
	this.ActionManager.IsTalking = true;
}

Player.prototype.CancelInteract = function() {
	this.ActionManager.IsTalking = false;
}

Player.prototype.OpenDoor = function(tileX,tileY,openTile,closeTile) {
	if(this.CanOpenDoor) {
		if(IsKeyPressed(GetPlayerKey(PLAYER_1, PLAYER_KEY_A))) {
			SetTile(tileX,tileY,GetPersonLayer(this.Name),openTile);
			this.CanOpenDoor = false;
			this.CanCloseDoor = true;
			this.DoorTileId = closeTile;
			this.DoorTileX = tileX;
			this.DoorTileY = tileY;
		}
	}
}

Player.prototype.CloseDoor = function() {
	if(this.CanCloseDoor && this.DoorTileId!=-1 && this.DoorTileX!=-1 && this.DoorTileY!=-1) {
			var distance = GetDistance(GetCenterXPositionOfTile(this.DoorTileX,this.DoorTileY),GetCenterYPositionOfTile(this.DoorTileX,this.DoorTileY),GetPersonX(this.Name),GetPersonY(this.Name));
			if(distance>this.CloseDoorMinDistance) {
				SetTile(this.DoorTileX,this.DoorTileY,GetPersonLayer(this.Name),this.DoorTileId);
				this.CanOpenDoor = true;
				this.CanCloseDoor = false;
				this.DoorTileId = -1;
				this.DoorTileX = -1;
				this.DoorTileY = -1;
			}
		}
}

Player.prototype.ChangeMap = function(x,y,layer) {
	SetPersonX(this.Name,x);
	SetPersonY(this.Name,y);
	SetPersonLayer(this.Name,layer);
	
	this.CanInteract = false;
	this.CanOpenDoor = true;
	this.CanCloseDoor = false;
	this.DoorTileId = -1;
	this.DoorTileX = -1;
	this.DoorTileY = -1;
}