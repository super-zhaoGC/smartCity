import * as Three from 'three';

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100, 100, 100)
camera.lookAt(0, 0, 0)

export default camera;
