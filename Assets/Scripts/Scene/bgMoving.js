#pragma strict

private var velocity : float = 0f;
var smoooth : float = 0.01f;

function Update () {
	transform.position.x = Mathf.SmoothDamp(transform.position.x, Camera.main.transform.position.x, velocity, smoooth);
	transform.position.y = Mathf.SmoothDamp(transform.position.y, Camera.main.transform.position.y, velocity, smoooth);
}