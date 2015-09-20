using UnityEngine;
using System.Collections;

public class GUIMoving : MonoBehaviour {
	public static float pageDest = 0;
	
	public void OpenPage(int index){
		pageDest = -1*index*Screen.width;
	}
	
	void Update(){
		if(Mathf.Abs(transform.position.x - pageDest) > 1)
			transform.position = new Vector3(Mathf.Lerp(transform.position.x, pageDest, 10f*Time.deltaTime), transform.position.y, transform.position.z);
	}
}
