using UnityEngine;
using System.Collections;

public class GameStart : MonoBehaviour {
	void Awake() {
		if (!PhotonNetwork.inRoom) {
			if (PhotonNetwork.connected)
				PhotonNetwork.Disconnect ();
			PhotonNetwork.offlineMode = true;
			PhotonNetwork.JoinRandomRoom ();
		} else
		OnJoinedRoom ();
	}
	void OnJoinedRoom (){
		Debug.Log ("Room is joined");
	}
}
