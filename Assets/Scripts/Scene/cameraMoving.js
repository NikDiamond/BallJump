#pragma strict

var target : Transform;
var smoothTime : float = 0.2f;
private var velocity : Vector3 = Vector3.zero;
private var velocity2D : float = 0.0f;
static var moving : boolean = true;

function Update () {
	if(target && moving){
		var tPoint : Vector3 = target.position;//targer position
		
		var point : Vector3 = camera.WorldToViewportPoint(new Vector3(tPoint.x, tPoint.y+0.5f, tPoint.z));
		var dest : Vector3 = (new Vector3(tPoint.x, tPoint.y+0.5f,tPoint.z) - camera.ViewportToWorldPoint(new Vector3(0.2f, 0.5f, point.z))) + transform.position;
		transform.position = Vector3.SmoothDamp(transform.position, dest, velocity, smoothTime);
	}
	if(!moving){
		if(camera.orthographicSize >= 5)
			camera.orthographicSize = Mathf.SmoothDamp(camera.orthographicSize, camera.orthographicSize-0.05f, velocity2D, 0.2f);
	}
}