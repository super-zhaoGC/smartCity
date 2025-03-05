import * as Three from 'three';

const scene = new Three.Scene();

const cubeTextureLoader = new Three.CubeTextureLoader().setPath("/textures/");
const cubeTexture = cubeTextureLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
])
scene.background = cubeTexture;
scene.environment = cubeTexture;
export default scene;