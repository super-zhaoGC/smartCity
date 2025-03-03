import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";
const createCity = () => {

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/model/city.glb", (gltf) => {

    scene.add(gltf.scene)
    gltf.scene.traverse((item) => {
      if (item.isMesh) {
        item.material = new Three.MeshBasicMaterial({
          color: new Three.Color(0x0c0e6f),
          side: Three.DoubleSide
        })
        modifyCityMaterial(item)
      }
    })
  })


}

export default createCity;