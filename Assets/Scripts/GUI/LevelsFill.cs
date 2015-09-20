using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LevelsFill : MonoBehaviour {
	public GameObject ToLevelPrefab;
	
	public GameObject EasyBox;
	public int easyLevels = 10;
	
	public GameObject NormalBox;
	public int normalLevels = 20;
	
	public GameObject HardBox;
	public int hardLevels = 20;
	
	void Start () {
		fill();
	}
	
	public void refill(){
		clear();
		fill();
	}
	
	void fill() {
		for(var i = 1; i<=Application.levelCount-GameMaster.levelShift;i++){
			var button = Instantiate(ToLevelPrefab);
			if(i<10)
				button.transform.GetChild(0).GetComponent<Text>().text = "0"+i;
			else
				button.transform.GetChild(0).GetComponent<Text>().text = ""+i;
			
			if(i<=easyLevels)
				button.transform.SetParent(EasyBox.gameObject.transform);
			else if(i<=normalLevels+easyLevels)
				button.transform.SetParent(NormalBox.gameObject.transform);
			else
				button.transform.SetParent(HardBox.gameObject.transform);
			
			button.GetComponent<RectTransform>().localScale = new Vector3(1f, 1f, 1f);
			
			if(GameMaster.OpenedLevel()-1<i) button.GetComponent<Button>().interactable = false;
			else AddListener(button.GetComponent<Button>(), i);
		}
	}
	
	void clear() {
		foreach (Transform child in EasyBox.gameObject.transform)
			GameObject.Destroy(child.gameObject);
		foreach (Transform child in NormalBox.gameObject.transform)
			GameObject.Destroy(child.gameObject);
		foreach (Transform child in HardBox.gameObject.transform)
			GameObject.Destroy(child.gameObject);
	}
	
	void AddListener(Button b, int val) {
		b.onClick.AddListener(delegate {
			OnClick(val);
		});
	}
	
	void OnClick(int lvl){
		//GO TO LEVEL
		Application.LoadLevel(lvl+GameMaster.levelShift-1);
	}
}
