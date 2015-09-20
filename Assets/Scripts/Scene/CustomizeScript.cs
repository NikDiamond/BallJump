using UnityEngine;
using System.Collections;

public class CustomizeScript : MonoBehaviour {	
	//TRAILS
	[System.Serializable]
	public class Trails{
		public Texture textures;
		public int achieveLevel;
	}
	public Trails[] trails;
	public static Trails[] staticTrails;
	
	void Start () {	
		staticTrails = trails;
	}
	public static bool isTrailOpened(int id){
		return (staticTrails[id].achieveLevel <= (GameMaster.OpenedLevel() - GameMaster.levelShift));
	}
}
