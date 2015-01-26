#pragma strict

var style : GUISkin;
var smooth : float = 0.1f;
var trails : Texture[];
var trailsPerCol : int = 3;
var levelsPerCol : int = 5;
private var dest : float = 0.0f;
private var readyLoad : int = 0;
private var wWidth : ScreenOrientation;
private var GUIposition : Vector3;

function Start() {
	wWidth = Screen.width;
	cameraMoving.moving = true;
}
function Update () {
	if(wWidth != Screen.width)
		OnResize();
}

function OnResize () {
	OpenPage(0);
	wWidth = Screen.width;
}

function OnGUI () {
	var butWidth : float = Screen.width/3;
	var butHeight : float = butWidth;
	if(butHeight > Screen.height/3){
		butHeight = Screen.height/3;
		butWidth = butHeight;
	}
	var padding : float = Screen.width/150;
	var velocity : float = 0.0f;
						
	var butStyle = style.GetStyle("Button");
	butStyle.fontSize = Mathf.Min(Screen.height,Screen.width)/15;
	
	var butStyleWnoHover = style.GetStyle("butStyleWnoHover");
	butStyleWnoHover.fontSize = Mathf.Min(Screen.height,Screen.width)/15;
	
	var labels = style.GetStyle("label");
	labels.fontSize = Mathf.Min(Screen.height,Screen.width)/12;
	//ANIM
	transform.position.x = Mathf.Lerp(transform.position.x, dest, smooth*Time.deltaTime);
	
	GUIposition = Camera.main.WorldToScreenPoint(new Vector3(transform.position.x, -1*transform.position.y, transform.position.z));
	//MAIN MENU ( 0 )
	if(GUI.Button(RectPos(0, Screen.width/2-butWidth-padding, Screen.height/2-butHeight-padding, butWidth, butHeight), "PLAY", butStyle))
		OpenPage(1);
	if(GUI.Button(RectPos(0, Screen.width/2-butWidth-padding, Screen.height/2+padding, butWidth, butHeight), "SETTINGS", butStyle))
		OpenPage(-1);
	if(GUI.Button(RectPos(0, Screen.width/2+padding, Screen.height/2-butHeight-padding, butWidth, butHeight), "SHOP", butStyle))
		OpenPage(-2);
	
	if(GUI.Button(RectPos(0, Screen.width/2+padding, Screen.height/2+padding, butWidth, butHeight), "EXIT", butStyle)){
		Application.Quit();
	}
	//LEVELS ( 1 )
	butWidth = Mathf.Min(Screen.width, Screen.height)/7;
	butHeight = butWidth;
	if(butHeight > (Screen.height-200-padding*5*2)/5){
		butHeight = (Screen.height-200-padding*5*2)/5;
		butWidth = butHeight;
	}
	butHeight = butHeight/2+20;
	var topPadding : float = butHeight*2 + padding*2;
	
	var cols : int = Application.levelCount/levelsPerCol;
	var levelBox : float = (Screen.width-padding/2)/(levelsPerCol+padding/2);
	if(levelBox > (Screen.height-topPadding - padding/2)/(cols+padding/2))
		levelBox = (Screen.height-topPadding - padding/2)/(cols+padding/2);
	var levelPaddingW : float = (Screen.width - levelBox*levelsPerCol)/levelsPerCol/2;
	var levelPaddingH : float = (Screen.height-topPadding)/levelBox;
	
	for(var i:int = 0; i <= (Application.levelCount-2); i++){
		var moreTen : int = i/10;
		var zero : String = "0";
		if(moreTen > 0)
			zero = "";
			
		var heightAdd : int = i/levelsPerCol;//Номер строки
		var j : int = (i+2) - levelsPerCol*heightAdd;
		var left : float = levelPaddingW + levelPaddingW*(j-2)*2+levelBox*(j-2);
		if((i+1) <= GameMaster.OpenedLevel()){
			if(GUI.Button(RectPos(1, left, topPadding+(levelBox+levelPaddingH*2)*heightAdd, levelBox, levelBox), ""+zero+(i+1), butStyle)){
				OpenPage(2);
				readyLoad = i+1;
			}
		}else{
			GUI.color.a = 0.5;
			GUI.Button(RectPos(1, left, topPadding+(levelBox+levelPaddingH*2)*heightAdd, levelBox, levelBox), ""+zero+(i+1), butStyleWnoHover);
			GUI.color.a = 1;
		}
		if(readyLoad != 0 && (transform.position.x - 0.1) <= dest)
			Application.LoadLevel(readyLoad);
	}
	
	if(GUI.Button(RectPos(1, padding, padding, butHeight, butHeight), "<", butStyle))
		OpenPage(0);
	//SETTINGS ( -1 )
	if(GUI.Button(RectPos(-1, padding, padding, butHeight, butHeight), "<", butStyle))
		OpenPage(0);
	GUI.Label (RectPos(-1, 0f, 0f, Screen.width, padding+butHeight), "SETTINGS", labels);
	
	//SHOP ( -2 )
	if(GUI.Button(RectPos(-2, padding, padding, butHeight, butHeight), "<", butStyle))
		OpenPage(0);
	GUI.Label (RectPos(-2, 0f, 0f, Screen.width, padding+butHeight), "SHOP", labels);
	butWidth = Screen.width/3;
	if(GUI.Button(RectPos(-2, Screen.width/2 - butWidth/2, Screen.height/2 - butHeight, butWidth, butHeight), "TRAILS", butStyle))
		OpenPage(-3);
	//SHOP -- TRAILS ( -3 )
	cols = Mathf.Ceil(trails.length/trailsPerCol);
	var trailBox : float = Screen.width/trailsPerCol - padding*trailsPerCol;
	if(trailBox > (Screen.height-topPadding)/cols - padding*cols)
		trailBox = (Screen.height-topPadding)/cols - padding*cols;
	var trailPaddingW : float = (Screen.width - trailBox*trailsPerCol)/trailsPerCol/2;
	var trailPaddingH : float = (Screen.height-topPadding)/trailBox;
	
	for(var k:int = 0; k <= (trails.length-1); k++){
		heightAdd = k/trailsPerCol;//Номер строки
		j = (k+1) - trailsPerCol*heightAdd;
		left = trailPaddingW + trailPaddingW*(j-1)*2+trailBox*(j-1);
		
		var trailStyle : GUIStyle;
		if(k == GameMaster.GetTrail())
			trailStyle = style.GetStyle("trailNow");
		else
			trailStyle = style.GetStyle("trail");
		if(GUI.Button(RectPos(-3, left, topPadding+(trailBox+trailPaddingH*2)*heightAdd, trailBox, trailBox), trails[k], trailStyle)){
			GameMaster.SetTrail(k);
		}
	}
	if(GUI.Button(RectPos(-3, padding, padding, butHeight, butHeight), "<", butStyle))
		OpenPage(-2);
}
function RectPos(page:float, x : float, y : float, w : float, h : float){
	var xPoint = GUIposition.x - Screen.width/2 + (page*Screen.width);
	var yPoint = GUIposition.y - Screen.height/2;
	return new Rect(xPoint + x, yPoint + y, w, h);
}
function OpenPage(page : float) {
	dest = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0f, 0f)).x*2*page*-1;
}