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

function Update () {
	onGround = Physics2D.OverlapCircle(checker.position, groundRadius, layerMask);//make a circle on player's steps
	
	if(onGround){//Jumping
		rigidbody2D.velocity.x = Mathf.SmoothDamp(rigidbody2D.velocity.x, speed, velocity, speedSmoothTime);
		
		if(Input.GetKeyDown(KeyCode.Space))
			rigidbody2D.AddForce(new Vector2(0, jumpForce*100));
	}
}

function OnTriggerEnter2D(coll : Collider2D) {
	if(coll.gameObject.tag == "die")
		Application.LoadLevel(Application.loadedLevel);
	if(coll.gameObject.tag == "end")
		Application.LoadLevel(Application.loadedLevel + 1);
}