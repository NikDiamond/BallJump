using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SetResults : MonoBehaviour {
	public GameObject newResult;
	public GameObject bestResult;
	
	void UpdateTimes () {
		newResult.GetComponent<Text>().text = GameMaster.currentTime();
		bestResult.GetComponent<Text>().text = GameMaster.TimeFromFloat(GameMaster.GetTime(Application.loadedLevel));
		
		if(GameMaster.TimeFromFloat(GameMaster.GetTime(Application.loadedLevel)) == "-1:00")
			bestResult.GetComponent<Text>().text = GameMaster.currentTime();
	}
	void FixedUpdate() {
		if(PlayerScript.isEnd)
			UpdateTimes();
	}
}
