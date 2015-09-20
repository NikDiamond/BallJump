using UnityEngine;
using System.Collections;

public class PlayerScript : MonoBehaviour {
	//ground check
	private bool onGround = false;//true if on ground
	public Transform checker;
	public LayerMask layerMask;
	public float groundRadius = 0.2f;
	//
	public float jumpForce = 2.5f;
	public float speed = 6f;
	public float speedSmoothTime = 0.2f;
	public GameObject dieObject;
	//PRIVATE
	private float velocity = 0f;
	private TrailRenderer trail;
	private bool trailSet = false;

	public static float slowSpeed = 1f;
	public static bool isEnd = false;
	public static bool isDead = false;
	//FUNCTIONS
	void Start() {
		//STATIC VARIABLES TO DEFAULTS
		GameMaster.startTime = Time.time;
		slowSpeed = 1f;
		isEnd = false;
		isDead = false;
		Camera.main.GetComponent<CameraMoving> ().target = transform;
		if (!dieObject)
			dieObject = GameObject.Find ("fallDie");
	}
	void Update () {
		if(!trailSet){
			trail = GetComponent<TrailRenderer> ();
			trail.sortingLayerName = "background";
			trail.materials [0].SetTexture ("_MainTex", CustomizeScript.staticTrails [GameMaster.GetTrail ()].textures);
			trailSet = true;
		}
		onGround = Physics2D.OverlapCircle(checker.position, groundRadius, layerMask);//make a circle on player's steps
		if(onGround){//Jumping
			if((Input.GetKeyDown(KeyCode.Space) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)) && Time.timeScale > 0){
				GetComponent<Rigidbody2D>().AddForce(new Vector2(0, jumpForce*100));
				GetComponent<AudioSource>().Play();
				if(!isEnd){
					GameMaster.Jump();
				}
			}
		}
	}
	void FixedUpdate () {
		if(onGround){
			GetComponent<Rigidbody2D>().velocity = new Vector2( Mathf.SmoothDamp(GetComponent<Rigidbody2D>().velocity.x, speed/slowSpeed, ref velocity, speedSmoothTime),
			                                                    GetComponent<Rigidbody2D>().velocity.y);
		}else{
			if(dieObject)
				dieObject.transform.position = new Vector3( GetComponent<Rigidbody2D>().position.x,
				                                           dieObject.transform.position.y,
				                                           dieObject.transform.position.z);
		}
		if(isDead && !GetComponent<Rigidbody2D>().isKinematic){//stop the ball if dead
			if(GetComponent<Rigidbody2D>().position.y < -50)
				GetComponent<Rigidbody2D>().isKinematic = true;
		}
	}
	
	void OnTriggerEnter2D(Collider2D coll) {
		if(coll.gameObject.tag == "die"){//die
			isDead = true;
			if(!isEnd)//if do not won
				GameControls.Instance.OnDie();
		}
		if(coll.gameObject.tag == "end"){//win
			isEnd = true;
			GameControls.Instance.OnWin();
		}
	}
	void OnCollisionEnter2D(Collision2D coll) {
		if(coll.gameObject.tag == "slow_stick")
			slowSpeed = 2f;
		else if(coll.gameObject.tag == "fast_stick")
			slowSpeed = 0.5f;
		else slowSpeed = 1f;
	}
}
