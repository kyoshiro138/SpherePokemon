function Debug(text) {
	windowManager.ShowDebug(text);
}

function DetectEntity() {
	gameManager.Player.ActionManager.ClearEntity();

	if(IsTrigger()) {
		var name = gameManager.Player.Name;
		var direction = gameManager.Player.ActionManager.Direction;
	
		gameManager.Player.ActionManager.InteractingEntityTileX = Math.floor(GetInteractingEntityX(name,direction) / TILE_SIZE.WIDTH);
		gameManager.Player.ActionManager.InteractingEntityTileY = Math.floor(GetInteractingEntityY(name,direction) / TILE_SIZE.HEIGHT);
		gameManager.Player.ActionManager.InteractingEntity = ENTITY.TRIGGER;
	} else {
		gameManager.Player.ActionManager.InteractingPersonName = GetInteractingPerson();
		
		if(gameManager.Player.ActionManager.InteractingPersonName != "") {
			var name = gameManager.Player.Name;
			var direction = gameManager.Player.ActionManager.Direction;
		
			gameManager.Player.ActionManager.InteractingEntityTileX = Math.floor(GetInteractingEntityX(name,direction) / TILE_SIZE.WIDTH);
			gameManager.Player.ActionManager.InteractingEntityTileY = Math.floor(GetInteractingEntityY(name,direction) / TILE_SIZE.HEIGHT);
			gameManager.Player.ActionManager.InteractingEntity = ENTITY.PERSON;
		}
	}
}

function TriggerShowSign(message) {
	if(gameManager.Player.ActionManager.Direction == DIRECTION.NORTH) {
		var tileX = gameManager.Player.ActionManager.InteractingEntityTileX;
		var tileY = gameManager.Player.ActionManager.InteractingEntityTileY;
		windowManager.ShowSign(tileX,tileY,message);
	}
}

function TriggerOpenDoor(tileId) {
	var canOpenDoor = gameManager.Player.ActionManager.HaveOpenedDoor() == false
						&& gameManager.Player.ActionManager.IsInteracting()
						&& gameManager.Player.ActionManager.Direction == DIRECTION.NORTH
	if(canOpenDoor) {
		var tileX = gameManager.Player.ActionManager.InteractingEntityTileX;
		var tileY = gameManager.Player.ActionManager.InteractingEntityTileY;
		gameManager.Player.ActionManager.OpenDoor(tileX,tileY,tileId);
	}
}

function TriggerCloseDoor() {
	if(gameManager.Player.ActionManager.IsAwayFromDoor()) {
		gameManager.Player.ActionManager.CloseDoor();
	}
}

function TriggerLeaveMap(map,posTileX,posTileY,posLayer) {
	var name = gameManager.Player.Name;
	var tileX = gameManager.Player.ActionManager.InteractingEntityTileX;
	var tileY = gameManager.Player.ActionManager.InteractingEntityTileY;
	
	if(IsPositionInsideTile(GetPersonX(name),GetPersonY(name),tileX,tileY)) {
		gameManager.Player.ActionManager.ActionEnabled = false;
		mapManager.FadeIn();
		
		if(mapManager.WillLeaveMap) {
			if(gameManager.Player.ActionManager.HaveOpenedDoor()) {
				gameManager.Player.ActionManager.CloseDoor();
			}
			
			gameManager.Player.ActionManager.Stand();
			mapManager.ChangeMap(map,posTileX,posTileY,posLayer);
		}
	}
}

function TriggerEnterMap() {
	if(mapManager.WillEnterMap) {
		mapManager.FadeOut();
		
		if(!mapManager.WillEnterMap) {
			gameManager.Player.ActionManager.ActionEnabled = true;
		}
	}
}
