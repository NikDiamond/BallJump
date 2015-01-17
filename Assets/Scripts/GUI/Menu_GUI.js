#pragma strict

var style : GUISkin;
var smooth : float = 0.1f;

function OnGUI () {	
	var butWidth : float = Screen.width/3;
	var butHeight : float = Screen.height/3;
	var padding : float = 10;
	var velocity : float = 0.0f;
						
	var butStyle = style.GetStyle("Button");
	var bigButStyle = style.GetStyle("BigButton");
	
	var GUIposition : Vector3 = Camera.main.WorldToScreenPoint(new Vector3(transform.position.x, -1*transform.position.y, transform.position.z));
	//MAIN MENU
	if(GUI.Button(new Rect(GUIposition.x - butWidth - padding, GUIposition.y - butHeight, butWidth, butHeight), "PLAY", butStyle)){
		transform.position.x = -1*Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0f, 0f)).x*2;
	}
	if(GUI.Button(new Rect(GUIposition.x + padding, GUIposition.y - butHeight, butWidth, butHeight), "SETTINGS", butStyle)){
		transform.position.x = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0f, 0f)).x*2;
	}
	if(GUI.Button(new Rect(GUIposition.x - butWidth - padding, GUIposition.y + padding, butWidth*2 + padding*2, butHeight), "EXIT", bigButStyle)){
		Application.Quit();
	}
	//LEVELS
	butWidth = (Screen.width-100-padding*5*2)/5;
	butHeight = (Screen.height-200-padding*5*2)/5;
	for(var i:int=1; i<=(Application.levelCount-1); i++){
		var moreTen : int = i/10;
		var zero : String = "0";
		if(moreTen > 0)
			zero = "";
		var heightAdd : int = (i-1)/5;//Номер строки
		var j : int = i - 5*heightAdd;
		
		var left : float = 50+padding*(j-1)*2+butWidth*(j-1);
		if(GUI.Button(new Rect(GUIposition.x + Screen.width/2 + left, 100+(butHeight+padding*2)*heightAdd + GUIposition.y - Screen.height/2, butWidth, butHeight), ""+zero+i, butStyle)){
			Application.LoadLevel(i);
		}
	}
	if(GUI.Button(new Rect(GUIposition.x + Screen.width/2 + padding, padding + GUIposition.y - Screen.height/2, butHeight/2+20, butHeight/2+20), "<", butStyle)){
		transform.position.x = 0f;
	}
	//SETTINGS
	if(GUI.Button(new Rect(GUIposition.x - (Screen.width + Screen.width/2) + padding, padding + GUIposition.y - Screen.height/2, butHeight/2+20, butHeight/2+20), "<", butStyle)){
		transform.position.x = 0f;
	}
}