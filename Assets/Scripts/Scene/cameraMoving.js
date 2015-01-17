#pragma strict

var target : Transform;
var smoothTime : float = 0.2f;
private var velocity : Vector3 = Vector3.zero;

function Update () {
	if(target){
		var tPoint : Vector3 = target.position;//targer position
		//tPoint.x = tPoint.x + Screen.width/3;
		
		var point : Vector3 = camera.WorldToViewportPoint(new Vector3(tPoint.x, tPoint.y+0.5f, tPoint.z));
		var dest : Vector3 = (new Vector3(tPoint.x, tPoint.y+0.5f,tPoint.z) - camera.ViewportToWorldPoint(new Vector3(0.2f, 0.5f, point.z))) + transform.position;
		transform.position = Vector3.SmoothDamp(transform.position, dest, velocity, smoothTime);
	}
}