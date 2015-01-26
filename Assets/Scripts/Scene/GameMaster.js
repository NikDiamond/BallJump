#pragma strict

static var jumpCount : int;

function Start(){
	jumpCount = 0;
}

static function levelCompleted(levelId : int){
	if(PlayerPrefs.GetInt("openedLevel", 1) < (levelId+1)){
		PlayerPrefs.SetInt("openedLevel", levelId+1);
	}
	JumpsApply(levelId, jumpCount);
}
static function OpenedLevel(){
	return PlayerPrefs.GetInt("openedLevel", 1);
}
static function GetTrail(){
	return PlayerPrefs.GetInt("trailTexture", 0);
}
static function SetTrail(number : int){
	PlayerPrefs.SetInt("trailTexture", number);
}
static function Jump(){
	jumpCount++;
}
static function GetJumps(level:int){
	return PlayerPrefs.GetInt("Score_"+level, 10000);
}
static function JumpsApply(level:int, count:int){
	if(GetJumps(level) > count)
		PlayerPrefs.SetInt("Score_"+level, count);
}