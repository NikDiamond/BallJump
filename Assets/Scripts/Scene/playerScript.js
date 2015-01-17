#pragma strict

//ground check
private var onGround : boolean = false;//true if on ground
var checker : Transform;
var layerMask : LayerMask;
var groundRadius : float = 0.2f;
//
var jumpForce : float = 2.5f;
var speed : float = 6f;
var speedSmoothTime : float = 0.2f;
//private
private var velocity : float = 0f;
private var fpsFix : float = 1f;
private var trail : TrailRenderer;

function Start() {
	trail = GetComponent(TrailRenderer);
	trail.sortingLayerName = "background";
}
function Update () {
	onGround = Physics2D.OverlapCircle(checker.position, groundRadius, layerMask);//make a circle on player's steps
	
	if(onGround){//Jumping
		rigidbody2D.velocity.x = Mathf.SmoothDamp(rigidbody2D.velocity.x, speed, velocity, speedSmoothTime);
		
		if(Input.GetKeyDown(KeyCode.Space))
			rigidbody2D.AddForce(new Vector2(0, jumpForce*100));
	}
}

function OnTriggerEnter2D(coll : Collider2D) {
	if(coll.gameObject.tag == "die" && cameraMoving.moving){
		Application.LoadLevel(Application.loadedLevel);
	}
	if(coll.gameObject.tag == "end"){
		cameraMoving.moving = false;
		Camera.main.transform.position.x = GameObject.FindGameObjectWithTag("end").gameObject.transform.position.x/2;
		Camera.main.orthographicSize = Camera.main.transform.position.x;
		if(Camera.main.orthographicSize < 5)
			Camera.main.orthographicSize = 5;
		
		yield WaitForSeconds(2);
		var nextLevel : int = Application.loadedLevel + 1;
		if(nextLevel < Application.levelCount)
			Application.LoadLevel(Application.loadedLevel + 1);
		else
			Application.LoadLevel(0);
		cameraMoving.moving = true;
	}
}