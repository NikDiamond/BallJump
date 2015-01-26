#pragma strict

static var position: float;
function Update(){
	if(position != rigidbody2D.position.x)
		rigidbody2D.MovePosition(new Vector2(position, rigidbody2D.position.y));
}