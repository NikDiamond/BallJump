#pragma strict

var target : Transform;
var smoothTime : float = 8f;
static var moving : boolean = true;//MOVE TO BALL OR NOT

function Start () {
	transform.position.x = target.transform.position.x;
	transform.position.y = target.transform.position.y;
}
function Update () {
	if(target && moving){//MOVE CAMERA TO BALL
		var tPoint : Vector3 = target.position;//targer position
		
		var point : Vector3 = camera.WorldToViewportPoint(new Vector3(tPoint.x, tPoint.y-1f, tPoint.z));
		var dest : Vector3 = (new Vector3(tPoint.x, tPoint.y-1f,tPoint.z) - camera.ViewportToWorldPoint(new Vector3(0.2f, 0.5f, point.z))) + transform.position;
		transform.position = Vector3.Lerp(transform.position, dest, smoothTime*Time.deltaTime);
	}
	if(!moving){//CAMERA ISNT MOVING TO BALL
		if(playerScript.isEnd){//IF WON, ZOOMING IN
			camera.orthographicSize = Mathf.Lerp(camera.orthographicSize, 5, 0.1f*Time.deltaTime);
		}else if(playerScript.isDead && !playerScript.isEnd){//IF PLAYER IS DEAD, MOVE TO LEVEL START
			Camera.main.transform.position.y = Mathf.Lerp(Camera.main.transform.position.y, 4.211129, 1f*Time.deltaTime);
			Camera.main.transform.position.x = Mathf.Lerp(Camera.main.transform.position.x, -10, 1f*Time.deltaTime);
		}
	}
}