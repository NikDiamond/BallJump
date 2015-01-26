#pragma strict

var exitTexture : Texture;
var reloadTexture : Texture;
var nextTexture : Texture;
var style : GUISkin;
var styleLevel : GUISkin;
//TUTORIAL
class TutorialItem{
	var pic: Texture2D;
	var text: String;
}
var tutorial: TutorialItem[];
private var tutorialGUI: boolean = false;
//PRIVATES
private var lvlStyle : GUIStyle;
private var velocity : float = 0.0f;
private var gameEndX : float;
private var tutorialX: float;

function Start() {
	gameEndX = -Screen.width;
	tutorialX = Screen.width/2;
	
	if(Application.loadedLevel > GameMaster.OpenedLevel()){
		Application.LoadLevel(0);
	}
	cameraMoving.moving = true;
	lvlStyle = styleLevel.GetStyle("label");
	yield WaitForSeconds(0.5);
	if(tutorial.Length > 0){
		tutorialGUI = true;
	}
}
function Update() {
	if(playerScript.isEnd)//moving end panel
		gameEndX = Mathf.Lerp(gameEndX, 0, 9f*Time.deltaTime);
	if(tutorialGUI){
		tutorialX = Mathf.Lerp(tutorialX, 0, 9f*Time.deltaTime);
	}
}
function OnGUI () {
	var backRect = styleLevel.GetStyle("box");
	//TUTORIAL\\
	if(tutorialGUI){
		if((tutorialX-0.1) < 0){
			Debug.Log(tutorialX);
			Time.timeScale = 0;
		}
		var tutorHeight: float = Screen.height/2;
		var goWidth = tutorHeight/4;
		var topPadding = Screen.height/2-tutorHeight/2;
		
		GUI.Label(new Rect(tutorialX, topPadding, Screen.width, tutorHeight), "", backRect);
		for(var i:int = 0; i < tutorial.Length; i++){//TUTURIAL ITEMS
		
			GUI.Label(new Rect(tutorialX, topPadding, Screen.width, 20), ""+tutorial[i].text);
			GUI.DrawTexture(new Rect(tutorialX, topPadding+20, Screen.width/2, tutorial[i].pic.height), tutorial[i].pic, ScaleMode.ScaleToFit);
			
		}
		if(GUI.Button(new Rect(tutorialX+Screen.width-goWidth, topPadding+tutorHeight-goWidth, goWidth, goWidth), nextTexture, style.GetStyle("button"))){
			tutorialGUI = false;
			Time.timeScale = 1;
		}
	}
	//INGAME GUI
	var exitWidth : int = Mathf.Min(Screen.width, Screen.height)/6;
	lvlStyle.fontSize = exitWidth/1.5;
	if(!playerScript.isEnd && !tutorialGUI){
		if(GUI.Button(new Rect(Screen.width - exitWidth - 10, 10, exitWidth, exitWidth), exitTexture, style.GetStyle("button"))){//EXIT
			Application.LoadLevel(0);
		}
		if(GUI.Button(new Rect(10, 10, exitWidth, exitWidth), reloadTexture, style.GetStyle("button"))){//RELOAD
			Application.LoadLevel(Application.loadedLevel);
		}
		if(GameMaster.jumpCount == 0)
			GUI.Label (new Rect (0, 10, Screen.width, exitWidth), "LEVEL "+Application.loadedLevel, lvlStyle);
		else
			GUI.Label (new Rect (0, 10, Screen.width, exitWidth), GameMaster.jumpCount+"", lvlStyle);
	}else{
	//GAME END GUI
		var gameEndHeight = Screen.height/3;
		topPadding = Screen.height/2 - gameEndHeight/2;
		var xPadding = gameEndX;
		exitWidth = gameEndHeight/4;
		lvlStyle.fontSize = gameEndHeight/5;
		
		GUI.Label(new Rect(gameEndX, topPadding,Screen.width, gameEndHeight), "", backRect);
		GUI.Label(new Rect(xPadding, topPadding+exitWidth, Screen.width, (gameEndHeight-exitWidth*2)/2), "Jumps: " + GameMaster.jumpCount, lvlStyle);
		GUI.Label(new Rect(xPadding, topPadding+exitWidth+(gameEndHeight-exitWidth*2)/2, Screen.width, (gameEndHeight-exitWidth*2)/2), "Best score: " + GameMaster.GetJumps(Application.loadedLevel), lvlStyle);
		
		if(GUI.Button(new Rect(xPadding+Screen.width - exitWidth, topPadding, exitWidth, exitWidth), exitTexture, style.GetStyle("button"))){//EXIT
			Application.LoadLevel(0);
		}
		if(GUI.Button(new Rect(xPadding, topPadding+gameEndHeight-exitWidth, exitWidth, exitWidth), reloadTexture, style.GetStyle("button"))){//RELOAD
			Application.LoadLevel(Application.loadedLevel);
		}
		if(Application.loadedLevel + 1 < Application.levelCount)
			if(GUI.Button(new Rect(xPadding+Screen.width-exitWidth, topPadding+gameEndHeight-exitWidth, exitWidth, exitWidth), nextTexture, style.GetStyle("button"))){//NEXT
					Application.LoadLevel(Application.loadedLevel + 1);
			}
	}
}