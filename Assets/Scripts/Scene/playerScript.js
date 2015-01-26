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
var textures : Texture[];
//private
private var velocity : float = 0f;
private var fpsFix : float = 1f;
private var trail : TrailRenderer;
static var slowSpeed : float = 0f;
static var isEnd : boolean = false;
static var isDead : boolean = false;

function Start() {
	//STATIC VARIABLES TO DEFAULTS
	slowSpeed = 0f;
	isEnd = false;
	isDead = false;
	
	trail = GetComponent(TrailRenderer);
	trail.sortingLayerName = "background";
	trail.materials[0].SetTexture("_MainTex", textures[GameMaster.GetTrail()]);
}
function Update () {
	onGround = Physics2D.OverlapCircle(checker.position, groundRadius, layerMask);//make a circle on player's steps
	if(onGround){//Jumping
		if((Input.GetKeyDown(KeyCode.Space) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)) && Time.timeScale > 0){
			rigidbody2D.AddForce(new Vector2(0, jumpForce*100));
			if(!isEnd)
				GameMaster.Jump();
		}
	}
}
function FixedUpdate () {
	if(onGround){
		var coef : int = 1;
		if(rigidbody2D.velocity.x < 0) coef = -1;
		
		slowSpeed = coef*slowSpeed;
		rigidbody2D.velocity.x = Mathf.SmoothDamp(rigidbody2D.velocity.x, speed+slowSpeed, velocity, speedSmoothTime);
	}else{
		dieScript.position = rigidbody2D.position.x;
	}
	if(isDead && !rigidbody2D.isKinematic){//stop the ball if dead
		if(rigidbody2D.position.y < -50)
			rigidbody2D.isKinematic = true;
	}
}

function OnTriggerEnter2D(coll : Collider2D) {
	if(coll.gameObject.tag == "die"){//die
		isDead = true;
		if(!isEnd){//if do not won
			cameraMoving.moving = false;
			Camera.main.transform.position.y = 0;
			yield WaitForSeconds(2);
			Application.LoadLevel(Application.loadedLevel);
		}
	}
	if(coll.gameObject.tag == "end"){//win
		isEnd = true;
		cameraMoving.moving = false;
		GameMaster.levelCompleted(Application.loadedLevel);
		
		Camera.main.transform.position.x = GameObject.FindGameObjectWithTag("end").gameObject.transform.position.x/2;
		Camera.main.orthographicSize = Camera.main.transform.position.x+5;
	}
}
function OnCollisionEnter2D(coll : Collision2D) {
	if(coll.gameObject.tag == "slow_stick")
		slowSpeed = -speed/2;
	else if(coll.gameObject.tag == "fast_stick")
		slowSpeed = speed/1.4;
	else slowSpeed = 0f;
}