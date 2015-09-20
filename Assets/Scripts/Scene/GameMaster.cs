using UnityEngine;
using System.Collections;

public class GameMaster : MonoBehaviour {	
	public static int jumpCount;
	public static float startTime;
	public static float resultTime;
	public static int levelShift = 2;
	
	public bool noSave = false;
	public int openedLevel = 0;
	
	//anim
	public static int openedLevelST;
	public static float boxX;
	public static bool boxActive = false;
	public static bool answerFlag = false;
	public static bool answer;
	public static string boxText;
	
	void Start(){
		if(Application.loadedLevel > GameMaster.OpenedLevel()){
			Application.LoadLevel(0);
		}
		CameraMoving.isEnabled = true;	
		//RESET
		boxActive = false;
		answerFlag = false;
		
		openedLevelST = openedLevel;
		if(openedLevel != 0)
			levelCompleted(openedLevel);
		if(noSave)
			PlayerPrefs.DeleteAll();
		jumpCount = 0;
		startTime = Time.time;
	}
	void Update() {
		if(!PlayerScript.isEnd && !PlayerScript.isDead)
			resultTime = Time.time - startTime;
	}
	public void LoadLevel(int index) {
		Application.LoadLevel(index);
	}
	public void ResetStats() {
		PlayerPrefs.DeleteAll();
	}
	public static string currentTime() {
		return TimeFromFloat(GameMaster.resultTime);
	}
	public static string TimeFromFloat(float time){
		int secs = Mathf.FloorToInt(time);
		int msecs = Mathf.FloorToInt(time*100) - Mathf.FloorToInt(time)*100;
		var zero = "";
		if(msecs < 10) zero = "0";
		if(msecs >= 100) msecs = 99;
		
		return secs + ":" + zero + msecs;
	}
	public static void levelCompleted(int levelId){
		if(PlayerPrefs.GetInt("openedLevel", 2) < (levelId+1) || openedLevelST != 0){
			PlayerPrefs.SetInt("openedLevel", (levelId+1));
		}
		JumpsApply(levelId, jumpCount);
		TimeApply(levelId, resultTime);
	}
	public static int OpenedLevel(){
		return PlayerPrefs.GetInt("openedLevel", 2);
	}
	public static int GetTrail(){
		return PlayerPrefs.GetInt("trailTexture", 0);
	}
	public static void SetTrail(int number){
		PlayerPrefs.SetInt("trailTexture", number);
	}
	public static void Jump(){
		jumpCount++;
	}
	public static int GetJumps(int level){
		return PlayerPrefs.GetInt("Score_"+level, 10000);
	}
	public static void JumpsApply(int level, int count){
		if(level != 1){//If not random
			if(GetJumps(level) > count)
				PlayerPrefs.SetInt("Score_"+level, count);
		}else {
			if(GetJumps(level) < count)
				PlayerPrefs.SetInt("Score_"+level, count);
		}
	}
	public static float GetTime(int level){
		return PlayerPrefs.GetFloat("TimeScore_"+level, -1);
	}
	public static void TimeApply(int level, float result){
		if(level != 1){//If not random
			if(GetTime(level) > result || GetTime(level) == -1)
				PlayerPrefs.SetFloat("TimeScore_"+level, result);
		}else {
			if(GetTime(level) < result || GetTime(level) == -1)
				PlayerPrefs.SetFloat("TimeScore_"+level, result);
		}
	}
}
