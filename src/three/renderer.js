import * as Three from 'three';

const renderer = new Three.WebGLRenderer({
  //开启抗锯齿
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer;