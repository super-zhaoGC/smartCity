import * as Three from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import MeshLine from "./MeshLine";
import LightWall from "./LightWall";
import LightRadar from "./LightRadar";
import AlarmSprite from "./AlarmSprite";
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
        if (item.name == "Layerbuildings") {
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x;
          meshLine.mesh.scale.set(size, size, size)
          scene.add(meshLine.mesh)
        }
      }
    })
    // //添加飞线
    // const flyLine = new FlyLine(scene)
    // scene.add(flyLine.mesh)
    // //添加着色器飞线
    // const flyLineShader = new FlyLineShader()
    // scene.add(flyLineShader.mesh)
    // //添加光墙
    // const lightWall = new LightWall()
    // scene.add(lightWall.mesh)
    // //添加雷达扫描
    // const lightRadar = new LightRadar()
    // scene.add(lightRadar.mesh)
    //添加警告精灵图
    // const alarmSprite = new AlarmSprite();
    // scene.add(alarmSprite.mesh)
    // alarmSprite.onClick(() => {
    //   console.log("警告");

    // })
  })


}

export default createCity;