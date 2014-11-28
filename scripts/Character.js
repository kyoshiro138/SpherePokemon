function Character(name,spriteset) {
	this.Name = name;
	this.SpriteSet = spriteset;
	this.ActionManager = new ActionManager(name);
	
	this.Initialize(name,spriteset);
}

Character.prototype.Initialize = function(name,spriteset) {
	CreatePerson(name,spriteset,true);
}

Character.prototype.ToString = function() {
	var str = "Character:[Name=" + this.Name + "]";
	return str;
}