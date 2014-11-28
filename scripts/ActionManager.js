function ActionManager(actor) {
	this.Actor = actor;
	this.Direction = DIRECTION.SOUTH;
	this.SideDirection = DIRECTION.NONE;
	this.Action = ACTION.WALK;
	this.IsMoving = false;
	this.IsTalking = false;
	this.Speed = 1;
	this.TalkDistance = 1;
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

ActionManager.prototype.Update = function() {
	if(this.IsMoving) {
		this.Move();
	} else {
		this.Stand();
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