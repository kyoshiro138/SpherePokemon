function Debug(text) {
	windowManager.ShowDebug(text);
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

function IsTriggerExisted(name,direction) {
	var x = GetPersonX(name);
	var y = GetPersonY(name);
	
	switch(direction) {
		case DIRECTION.NORTH:
			y = y - (TILE_SIZE.HEIGHT/2);
			break;
		case DIRECTION.SOUTH:
			y = y + (TILE_SIZE.HEIGHT/2);
			break;
		case DIRECTION.WEST:
			x = x - (TILE_SIZE.WIDTH/2);
			break;
		case DIRECTION.EAST:
			x = x + (TILE_SIZE.WIDTH/2);
			break;
	}
	
	return IsTriggerAt(x,y,GetPersonLayer(name));
}

function ExecuteTriggerAt(name,direction) {
	var x = GetPersonX(name);
	var y = GetPersonY(name);
	
	switch(direction) {
		case DIRECTION.NORTH:
			y = y - (TILE_SIZE.HEIGHT/2);
			break;
		case DIRECTION.SOUTH:
			y = y + (TILE_SIZE.HEIGHT/2);
			break;
		case DIRECTION.WEST:
			x = x - (TILE_SIZE.WIDTH/2);
			break;
		case DIRECTION.EAST:
			x = x + (TILE_SIZE.WIDTH/2);
			break;
	}
	
	ExecuteTrigger(x,y,GetPersonLayer(name));
}

function IsPositionInsideTile(x,y,tileX,tileY) {
	var xDistance = x - (tileX * TILE_SIZE.WIDTH);
	var yDistance = y - (tileY * TILE_SIZE.HEIGHT);
	
	if(0<xDistance && xDistance<TILE_SIZE.WIDTH && 0<yDistance && yDistance<TILE_SIZE.HEIGHT)
		return true;
	return false;
}

function KeyPressed(key) {
	var direction = GetDirectionFromMovementKey(key);
	
	if(!gameManager.Player.ActionManager.IsMoving) {
		gameManager.Player.ActionManager.IsMoving = true;
		gameManager.Player.ActionManager.Direction = direction;
	} else {
		gameManager.Player.ActionManager.SideDirection = direction;
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