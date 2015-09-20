using UnityEngine;
using System.Collections;

public class LevelGenerator : Photon.MonoBehaviour {
	[System.Serializable] 
	public class Settings{
		public float maxAngle;
		public float minScale;
		public float maxScale;
		public float yAmplitude;
		public float yStep;
		public float distance;
		public float range;
	}

	public Settings settings;
	public GameObject platformPrefab;
	public GameObject playerPrefab;
	public GameObject dieObject;

	private GameObject player;
	private static Vector3 localPos;
	private static Vector3 remotePos;

	private float prevSpawn;
	private float yPosition;
	//Rotation correction vars
	private float prevRotation = 0f;

	void Start () {
		Generate (new Vector3(0f,0f,0f), new Vector3(150f, platformPrefab.transform.localScale.y, 1f), 0);
		player = PhotonNetwork.Instantiate (playerPrefab.name, new Vector3(0f, 1f, 0f), Quaternion.identity, 0);
		//need to fix (all c# scripts needed)
		player.GetComponent<PlayerScript> ().enabled = true;
		player.GetComponent<PlayerScript> ().dieObject = dieObject;
		player.name = "local";
		Camera.main.GetComponent<CameraMoving> ().target = player.transform;
	}

	private void Generate(Vector3 pos, Vector3 scale, float rotation) {
		if (PhotonNetwork.isNonMasterClientInRoom)
						return;
		//checking rotation
		if(prevRotation > 180)
			prevRotation = -1*(360 - prevRotation);
		if(Mathf.Abs(prevRotation) >= settings.maxAngle/2 && Mathf.Abs(rotation) >= settings.maxAngle/2) {
			if((prevRotation > 0 && rotation > 0) || (prevRotation < 0 && rotation < 0)) {//signes is equals
				rotation = -rotation;
			}
		}
		//generating
		GameObject obj = PhotonNetwork.Instantiate(platformPrefab.name, pos, Quaternion.Euler(0,0,rotation), 0);
		obj.transform.localScale = scale;

		prevRotation = obj.transform.eulerAngles.z;
	}
	private void FixedUpdate() {
		localPos = player.transform.position;

		if (PhotonNetwork.otherPlayers.Length == 0)
			remotePos = localPos;
		else
			remotePos = GameObject.Find (playerPrefab.name + "(Clone)").transform.position;

		float maxPos = Mathf.Max (localPos.x, remotePos.x);//pos of first coming player
		float spawnPos = maxPos + settings.range;//current spawn pos
		if (Mathf.Abs (spawnPos - prevSpawn) >= settings.distance) {//if distance >= settings.distance
			float angle = Random.Range(-settings.maxAngle, settings.maxAngle);
			Generate(
				new Vector3(
					spawnPos,
					Random.Range(-settings.yAmplitude, settings.yAmplitude)+yPosition,
					0f ),
				new Vector3(
					Random.Range(settings.minScale, settings.maxScale),
					platformPrefab.transform.localScale.y,
					0f ), angle );
			prevSpawn = spawnPos;
			yPosition += settings.yStep;
		}
	}
}
