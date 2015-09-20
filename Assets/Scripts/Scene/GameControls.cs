using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class GameControls : MonoBehaviour {	

	public GameObject TimeCount;
	public GameObject GameOverCanvas;
	public bool isRandomLevel = false;
	
	private bool firstTime = true;
	public static GameControls Instance;
	
	void Awake(){
		Instance = this;
	}
	public void Reload() {
		Application.LoadLevel(Application.loadedLevel);
	}
	public IEnumerator Reload(int seconds){
		yield return new WaitForSeconds (seconds);
		Reload ();
	}
	public void NextLevel() {
		Application.LoadLevel(Application.loadedLevel+1);
	}
	public void Exit() {
		Application.LoadLevel(0);
	}
	public void FixedUpdate() {
		if(!PlayerScript.isEnd)
			TimeCount.GetComponent<Text>().text = GameMaster.currentTime();
	}
	public void OnWin() {
		if(firstTime){
			CameraMoving.isEnabled = false;
			GameMaster.levelCompleted(Application.loadedLevel);
			Camera.main.transform.position = new Vector3(GameObject.FindGameObjectWithTag("end").gameObject.transform.position.x/2,
			                                             Camera.main.transform.position.y,
			                                             Camera.main.transform.position.z);
			//GAME OVER CANVAS
			GameOverCanvas.GetComponent<Animator>().SetTrigger("Show");
			string lvlName = ""+(Application.loadedLevel-1);
			if(Application.loadedLevel < 10) lvlName = "0"+Application.loadedLevel;
			TimeCount.GetComponent<Text>().text = "LEVEL " + lvlName;
			if(isRandomLevel) 
				TimeCount.GetComponent<Text>().text = "RANDOM LEVEL";

			firstTime = false;
		}
		Camera.main.orthographicSize = Camera.main.transform.position.x+5;
	}
	public void OnDie() {
		if (firstTime) {
			firstTime = false;
			CameraMoving.isEnabled = false;
			//Camera.main.transform.position = new Vector3 (Camera.main.transform.position.x, 0f, Camera.main.transform.position.z);
			Animator CameraAnim = GameObject.Find("CameraWrapper").GetComponent<Animator>();
			CameraAnim.SetTrigger("start");
			StartCoroutine(Reload (2));
		}
	}
}
