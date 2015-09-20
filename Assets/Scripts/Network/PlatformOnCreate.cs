using UnityEngine;
using System.Collections;

public class PlatformOnCreate : Photon.MonoBehaviour {
	public void Start() {
		transform.SetParent (GameObject.Find("Level").transform);
		if (GetComponent<PhotonView> ().isMine)
			GetComponent<PhotonView> ().RPC ("OnCreated", PhotonTargets.OthersBuffered, new object[]{ transform.localScale });
	}
	[PunRPC]
	private void OnCreated(Vector3 scale) {
		if(PhotonNetwork.isNonMasterClientInRoom)
			transform.localScale = scale;
	}
}
