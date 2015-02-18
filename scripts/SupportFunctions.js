function IsPositionInsideTile(x,y,tileX,tileY) {
	var xDistance = x - (tileX * TILE_SIZE.WIDTH);
	var yDistance = y - (tileY * TILE_SIZE.HEIGHT);
	
	if(0<xDistance && xDistance<TILE_SIZE.WIDTH && 0<yDistance && yDistance<TILE_SIZE.HEIGHT)
		return true;
	return false;
}

function KeyPressed(key) {
	if(gameManager.Player.ActionManager.ActionEnabled) {
		var direction = GetDirectionFromMovementKey(key);
		
		if(!gameManager.Player.ActionManager.IsMoving) {
			gameManager.Player.ActionManager.IsMoving = true;
			gameManager.Player.ActionManager.Direction = direction;
		} else {
			gameManager.Player.ActionManager.SideDirection = direction;
		}
	} else {
		gameManager.Player.ActionManager.Stand();
	}
}

function KeyReleased(key) {
	var direction = GetDirectionFromMovementKey(key);

	if(gameManager.Player.ActionManager.Direction == direction) {
		if(gameManager.Player.ActionManager.SideDirection == DIRECTION.NONE) {
			gameManager.Player.ActionManager.IsMoving = false;
		} else {
			gameManager.Player.ActionManager.Direction = gameManager.Player.ActionManager.SideDirection;
			gameManager.Player.ActionManager.SideDirection = DIRECTION.NONE;
		}
	} else {
		if(gameManager.Player.ActionManager.SideDirection == direction) {
			gameManager.Player.ActionManager.SideDirection = DIRECTION.NONE;
		}
	}
}

function GetDirectionFromMovementKey(key) {
	switch(key) {
		case gameManager.GameSetting.KeyUp:
			return DIRECTION.NORTH;
		case gameManager.GameSetting.KeyDown:
			return DIRECTION.SOUTH;
		case gameManager.GameSetting.KeyLeft:
			return DIRECTION.WEST;
		case gameManager.GameSetting.KeyRight:
			return DIRECTION.EAST;
		default:
			return undefined;
	}
}

function GetPlayerOppositeDirection() {
	var direction = gameManager.Player.ActionManager.Direction;
	switch(direction) {
		case DIRECTION.NORTH: return DIRECTION.SOUTH;
		case DIRECTION.SOUTH: return DIRECTION.NORTH;
		case DIRECTION.WEST: return DIRECTION.EAST;
		case DIRECTION.EAST: return DIRECTION.WEST;
	}
}

function GetMoveCommand(direction) {
	switch(direction) {
		case DIRECTION.NORTH:
			return COMMAND_MOVE_NORTH;
		case DIRECTION.EAST:
			return COMMAND_MOVE_EAST;
		case DIRECTION.WEST:
			return COMMAND_MOVE_WEST;
		case DIRECTION.SOUTH:
			return COMMAND_MOVE_SOUTH;
	}
}

function GetCenterXPositionOfTile(tileX,tileY) {
	var x = tileX*TILE_SIZE.WIDTH + (TILE_SIZE.WIDTH/2);
	return x;
}

function GetCenterYPositionOfTile(tileX,tileY) {
	var x = tileY*TILE_SIZE.HEIGHT + (TILE_SIZE.HEIGHT/2);
	return x;
}

function GetDistance(fromX,fromY,toX,toY) {
	var deltaX = (fromX-toX)*(fromX-toX);
	var deltaY = (fromY-toY)*(fromY-toY);
	return Math.sqrt(deltaX + deltaY);
}

function IsObstructed(name,direction) {
	var x = GetPersonX(name);
	var y = GetPersonY(name);
	var speedX = GetPersonSpeedX(name);
	var speedY = GetPersonSpeedY(name);
	switch(direction)	{
		case DIRECTION.NORTH: return IsPersonObstructed(name,x,y-speedY);
		case DIRECTION.SOUTH: return IsPersonObstructed(name,x,y+speedY);
		case DIRECTION.WEST: return IsPersonObstructed(name,x-speedX,y);
		case DIRECTION.EAST: return IsPersonObstructed(name,x+speedX,y);
		default: return false;
	}
}
function IsTrigger() {
	var name = gameManager.Player.Name;
	var direction = gameManager.Player.ActionManager.Direction;
	
	var x = GetInteractingEntityX(name,direction);
	var y = GetInteractingEntityY(name,direction);
	var layer = GetPersonLayer(name);
	
	return IsTriggerAt(x,y,layer);
}

function GetInteractingPerson() {
	var name = gameManager.Player.Name;
	var direction = gameManager.Player.ActionManager.Direction;
	var x = GetPersonX(name);
	var y = GetPersonY(name);
	var speedX = GetPersonSpeedX(name);
	var speedY = GetPersonSpeedY(name);
	
	switch(direction)	{
		case DIRECTION.NORTH: return GetObstructingPerson(name,x,y-speedY);
		case DIRECTION.SOUTH: return GetObstructingPerson(name,x,y+speedY);
		case DIRECTION.WEST: return GetObstructingPerson(name,x-speedX,y);
		case DIRECTION.EAST: return GetObstructingPerson(name,x+speedX,y);
		default: return "";
	}
}

function ExecuteTriggerAt(name,direction) {
	var x = GetInteractingEntityX(name,direction);
	var y = GetInteractingEntityY(name,direction);
	var layer = GetPersonLayer(name);
	
	ExecuteTrigger(x,y,layer);
}

function GetInteractingEntityX(name,direction) {
	var x = GetPersonX(name);
	
	switch(direction) {
		case DIRECTION.WEST:
			x = x - (TILE_SIZE.WIDTH/2);
			break;
		case DIRECTION.EAST:
			x = x + (TILE_SIZE.WIDTH/2);
			break;
	}
	
	return x;
}

function GetInteractingEntityY(name,direction) {
	var y = GetPersonY(name);
	
	switch(direction) {
		case DIRECTION.NORTH:
			y = y - (TILE_SIZE.HEIGHT/2);
			break;
		case DIRECTION.SOUTH:
			y = y + (TILE_SIZE.HEIGHT/2);
			break;
	}
	
	return y;
}