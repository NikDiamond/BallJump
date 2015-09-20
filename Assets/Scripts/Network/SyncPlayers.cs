using UnityEngine;
using System.Collections;

public class SyncPlayers : Photon.MonoBehaviour {
	void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info) {
		if (stream.isWriting) {
			if(!GetComponent<PhotonView>().isMine) return;
			//
			//stream.SendNext(transform.position);
		} else {
			if(GetComponent<PhotonView>().isMine) return;
			//
			//transform.position = (Vector3)stream.ReceiveNext();
		}
	}
}
