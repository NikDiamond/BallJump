using UnityEngine;
using System.Collections;

public class CameraMoving : MonoBehaviour {
	public Transform target;
	public float smoothTime = 6f;
	public static bool isEnabled = true;

	void Start() {
		if(target){
			transform.position = new Vector3(target.transform.position.x, target.transform.position.y, transform.position.z);
		}
	}
	void FixedUpdate() {
		if(target && isEnabled){//MOVE CAMERA TO BALL
			Vector3 targetPos = target.position;//targer position
			Vector3 pos = Camera.main.WorldToViewportPoint(new Vector3(targetPos.x, targetPos.y-1f, targetPos.z));
			Vector3 destination = (new Vector3(targetPos.x, targetPos.y-1f,targetPos.z) - Camera.main.ViewportToWorldPoint(new Vector3(0.2f, 0.3f, pos.z))) + transform.position;

			transform.position = Vector3.Lerp(transform.position, destination, smoothTime);
		}
		/*
		if(!moving){//CAMERA ISNT MOVING TO BALL
			if(playerScript.isEnd){//IF WON, ZOOMING IN
				GetComponent.<Camera>().orthographicSize = Mathf.Lerp(GetComponent.<Camera>().orthographicSize, 5, 0.1f*Time.deltaTime);
			}else if(playerScript.isDead && !playerScript.isEnd){//IF PLAYER IS DEAD, MOVE TO LEVEL START
				Camera.main.transform.position.y = Mathf.Lerp(Camera.main.transform.position.y, 0, 1f*Time.deltaTime);
				Camera.main.transform.position.x = Mathf.Lerp(Camera.main.transform.position.x, -10, 1f*Time.deltaTime);
			}
		}
		*/
	}
}
