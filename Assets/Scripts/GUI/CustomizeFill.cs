using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class CustomizeFill : MonoBehaviour {	
	public GameObject trailsBox;
	public Sprite[] trailLogos;
	public GameObject lockedText;
	public GameObject buttonPrefab;
	
	void Start () {
		fill();
	}
	
	public void refill() {
		clear();
		fill();
	}
	
	void fill() {
		for(var i = 0; i<trailLogos.Length; i++){
			GameObject Item = Instantiate(buttonPrefab);
			Item.transform.SetParent(trailsBox.gameObject.transform);
			Item.transform.localScale = new Vector3(0.95f,0.95f,0.95f);
			Item.transform.GetChild(0).GetComponent<Image>().sprite = trailLogos[i];
			
			//if trail is choosed
			if(i == GameMaster.GetTrail()){//00ccff
				Item.transform.localScale = new Vector3(1f,1f,1f);
				Item.transform.GetComponent<Image>().color = new Color(0, 204, 255);
			}
			
			if(CustomizeScript.isTrailOpened(i))
				AddTrailListener(Item.GetComponent<Button>(), i);
			else{//trail is not opened
				Image img = Item.transform.GetChild(0).GetComponent<Image>();
				img.color = new Color(img.color.r, img.color.g, img.color.b, 0.1f);

				img = Item.transform.GetComponent<Image>();
				img.color = new Color(img.color.r, img.color.g, img.color.b, 0.1f);

				lockedText = Instantiate(lockedText);
				lockedText.transform.GetComponent<Text>().enabled = true;
				lockedText.transform.SetParent(Item.transform);
				lockedText.transform.localScale = new Vector3(1f,1f,1f);
				lockedText.transform.GetComponent<Text>().text = CustomizeScript.staticTrails[i].achieveLevel+" LVL";
			}
		}
	}
	
	void clear() {
		foreach (Transform child in trailsBox.gameObject.transform)
			GameObject.Destroy(child.gameObject);
	}	
	
	void AddTrailListener(Button b, int val) {
		b.onClick.AddListener(delegate {
			OnTrailClick(val);
		});
	}
	
	void OnTrailClick(int index){
		GameMaster.SetTrail(index);
		refill();
	}
}
