function Player(name,spriteset) {
	this.inheritFrom = Character;
	this.inheritFrom(name,spriteset);
}

Player.prototype.Initialize = function(name,spriteset) {
	CreatePerson(name,spriteset,false);
	AttachCamera(name);
	AttachInput(name);
}

Player.prototype.ToString = function() {
	var str = "Player: [Name:" + this.Name + "]";
	str += " [Direction:" + this.ActionManager.Direction + "]";
	str += " [X:" + GetPersonX(this.Name) + "]";
	str += " [Y:" + GetPersonY(this.Name) + "]\n";
	str += this.ActionManager.ToString();
	
	return str;
}

Player.prototype.UpdateAction = function() {
	this.ActionManager.UpdateMovement();
}

Player.prototype.ToggleShoes = function() {
	this.ActionManager.ToggleRun();
}
