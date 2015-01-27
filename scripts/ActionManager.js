function ActionManager(actor) {
	this.Actor = actor;
	this.Direction = DIRECTION.SOUTH;
	this.SideDirection = DIRECTION.NONE;
	this.Action = ACTION.WALK;
	this.IsMoving = false;
	this.IsTalking = false;
	this.Speed = 1;
	this.TalkDistance = 1;
	
	this.InteractingEntity = ENTITY.NONE;
	this.InteractingPersonName = "";
	this.InteractingEntityTileX = -1;
	this.InteractingEntityTileY = -1;
	
	this.DoorTileId = -1;
	this.DoorPositionX = -1;
	this.DoorPositionY = -1;
}

ActionManager.prototype.ToString = function() {
	var str = "Action: [Entity:"+this.InteractingEntity+"]";
	str += " [Person:"+this.InteractingPersonName+"]";
	str += " [EntityX:"+this.InteractingEntityTileX+"]";
	str += " [EntityY:"+this.InteractingEntityTileY+"]";
	
	return str;
}

ActionManager.prototype.Stand = function() {
	var direction = "Face" + this.Direction;
	SetPersonDirection(this.Actor,direction);
}

ActionManager.prototype.Move = function() {
	var direction = "Move" + this.Direction;
	SetPersonDirection(this.Actor,direction);
	
	var command;
	if(!IsObstructed(this.Actor,this.Direction)) {
		command = GetMoveCommand(this.Direction);
		QueuePersonCommand(this.Actor,command,true);
	} else if(this.SideDirection == DIRECTION.NONE || IsObstructed(this.Actor,this.SideDirection)) {
		this.Stand();
	}
	
	if(this.SideDirection != DIRECTION.NONE && !IsObstructed(this.Actor,this.SideDirection)) {
		command = GetMoveCommand(this.SideDirection);
		QueuePersonCommand(this.Actor,command,true);
	}
}

ActionManager.prototype.UpdateMovement = function() {
	if(this.IsMoving) {
		this.Move();
	} else {
		this.Stand();
	}
}

ActionManager.prototype.UpdateInteraction = function() {
	switch(this.InteractingEntity) {
		case ENTITY.PERSON:
			if(this.InteractingPersonName!="") {
				CallPersonScript(this.InteractingPersonName,SCRIPT_ON_ACTIVATE_TOUCH);
				if(this.IsInteracting()) {
					CallPersonScript(this.InteractingPersonName,SCRIPT_ON_ACTIVATE_TALK);
				}
			}
			break;
		
		case ENTITY.TRIGGER:
			ExecuteTriggerAt(this.Actor,this.Direction);
			break;
		
		default:
			if(this.HaveOpenedDoor()) {
				TriggerCloseDoor();
			}
			break;
	}
}

ActionManager.prototype.ToggleRun = function() {
	if(this.Action == ACTION.WALK) {
		this.Action = ACTION.RUN;
		this.SetSpeed(2);
		SetPersonSpriteset(this.Actor,LoadSpriteset("HeroMaleRun.rss"));
	} else if (this.Action == ACTION.RUN) {
		this.Action = ACTION.WALK;
		this.SetSpeed(1);
		SetPersonSpriteset(this.Actor,LoadSpriteset("HeroMaleWalk.rss"));
	}
}

ActionManager.prototype.SetSpeed = function(speed) {
	this.Speed = speed;
	SetPersonSpeed(this.Actor,speed);
}

ActionManager.prototype.IsInteracting = function() {
	return IsKeyPressed(GetPlayerKey(PLAYER_1, PLAYER_KEY_A));
}

ActionManager.prototype.ClearEntity = function() {
	this.InteractingEntity = ENTITY.NONE;
	this.InteractingPersonName = "";
	this.InteractingEntityTileX = -1;
	this.InteractingEntityTileY = -1;
}

ActionManager.prototype.OpenDoor = function(tileX,tileY,tileId) {
	var tileLayer = GetPersonLayer(this.Actor);
	this.DoorTileId = GetTile(tileX,tileY,tileLayer);
	this.DoorPositionX = tileX;
	this.DoorPositionY = tileY;
	
	SetTile(tileX,tileY,tileLayer,tileId);
}

ActionManager.prototype.CloseDoor = function() {
	var tileLayer = GetPersonLayer(this.Actor);
	SetTile(this.DoorPositionX,this.DoorPositionY,tileLayer,this.DoorTileId);
	
	this.DoorTileId = -1;
	this.DoorPositionX = -1;
	this.DoorPositionY = -1;
}

ActionManager.prototype.HaveOpenedDoor = function() {
	return this.DoorTileId!=-1;
}

ActionManager.prototype.IsAwayFromDoor = function() {
	var centerXPositionOfDoor = GetCenterXPositionOfTile(this.DoorPositionX,this.DoorPositionY);
	var centerYPositionOfDoor = GetCenterYPositionOfTile(this.DoorPositionX,this.DoorPositionY);
	var currentDistance = GetDistance(centerXPositionOfDoor,centerYPositionOfDoor,GetPersonX(this.Actor),GetPersonY(this.Actor));
	var closeDoorDistance = 30;
	return currentDistance > closeDoorDistance;
}