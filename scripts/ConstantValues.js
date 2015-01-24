var SCREEN_SIZE = {
		WIDTH : GetScreenWidth(),
		HEIGHT : GetScreenHeight()
};
var TILE_SIZE = {
		WIDTH : 16,
		HEIGHT : 16
};
var DIRECTION = {
	NORTH : "North",
	EAST : "East",
	WEST : "West",
	SOUTH : "South",
	NONE : "None"
};
var ACTION = {
	WALK : "Walk",
	RUN : "Run",
	RIDE : "Ride"
};
var COLOR = {
	WHITE : CreateColor(255,255,255,255),
	BLACK : CreateColor(0,0,0,255),
	RED : CreateColor(255,0,0,255)
};