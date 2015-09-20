using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Connect : MonoBehaviour {

	public GameObject textLog;
	public int maxPlayersC = 2;

	void Start () {
		PhotonNetwork.logLevel = PhotonLogLevel.Full;
		PhotonNetwork.autoJoinLobby = false;
		PhotonNetwork.ConnectUsingSettings("1.0");
		PhotonNetwork.sendRate = 20;
		PhotonNetwork.sendRateOnSerialize = 10;
	}

	public void FindGame() {
		PhotonNetwork.JoinLobby();
	}

	void OnJoinedLobby() {
		PhotonNetwork.JoinRandomRoom();
	}
	
	void OnJoinedRoom() {
		StartCoroutine(CheckForJoin());
	}
	
	IEnumerator CheckForJoin() {
		while(PhotonNetwork.room.playerCount != maxPlayersC){
			yield return null;
		}
		PhotonNetwork.LoadLevel(1);
	}

	void OnPhotonRandomJoinFailed()
	{
		PhotonNetwork.CreateRoom(null,
			new RoomOptions() {
				isVisible = true,
				maxPlayers = (byte)this.maxPlayersC,
				isOpen = true
			},TypedLobby.Default);
	}

	void OnPhotonCreateRoomFailed(){
		PhotonNetwork.JoinRandomRoom();
	}
	
	void FixedUpdate() {
		textLog.GetComponent<Text> ().text = PhotonNetwork.connectionStateDetailed + "";
	}

	public void Cancel() {
		if(PhotonNetwork.room != null)
			PhotonNetwork.LeaveRoom();
		PhotonNetwork.LeaveLobby();
	}
}
