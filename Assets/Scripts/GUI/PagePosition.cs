using UnityEngine;
using System.Collections;

public class PagePosition : MonoBehaviour {
	public int pageId = 0;
	
	void FixedUpdate () {
		MoveTo(pageId*gameObject.GetComponentInParent<RectTransform>().rect.width);
	}
	
	void MoveTo(float pos) {
		if(GetComponent<RectTransform>().localPosition.x != pos)
			GetComponent<RectTransform>().localPosition = new Vector3(pos, GetComponent<RectTransform>().localPosition.y, GetComponent<RectTransform>().localPosition.z);
	}
}
