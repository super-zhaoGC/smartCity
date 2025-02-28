import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import scene from "../scene";
const createCity = () => {

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/public/model/city.glb", (gltf) => {
    console.log(gltf.scene);

    scene.add(gltf.scene)
    gltf.scene.traverse((item) => {
      if (item.isMesh) {
        item.material = new Three.MeshBasicMaterial({
          color: new Three.Color(0x00ffff),
          side: Three.DoubleSide
        })
      }
    })
  })


}

export default createCity;