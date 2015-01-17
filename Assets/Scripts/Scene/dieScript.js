#pragma strict

function Update () {
	transform.position.x = GameObject.FindGameObjectWithTag("player").gameObject.rigidbody2D.position.x;
}