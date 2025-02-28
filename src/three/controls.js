import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from './camera';
import renderer from './renderer';

const controls = new OrbitControls(camera, renderer.domElement)
//设置控制器阻尼感
controls.enableDamping = true

export default controls