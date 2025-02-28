import controls from "./controls";
import renderer from "./renderer";
import scene from "./scene";
import camera from "./camera";
const render = () => {
  controls.update()
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

export default render;
