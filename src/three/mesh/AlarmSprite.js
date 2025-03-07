import * as Three from "three"
import camera from "../camera"

class AlarmSprite {
  constructor(type = "火警", position = { x: -18, z: 3, }, color = 0xffffff) {
    const textureLoader = new Three.TextureLoader()

    const typeObj = {
      火警: "/textures/tag/fire.png",
      治安: "/textures/tag/jingcha.png",
      电力: "/textures/tag/e.png"
    }

    const texture = textureLoader.load(typeObj[type])
    this.spriteMaterial = new Three.SpriteMaterial({ map: texture, color: color, transparent: true, depthTest: false })
    this.mesh = new Three.Sprite(this.spriteMaterial)
    this.mesh.position.set(position.x, 3.5, position.z)
    this.fns = []

    this.rayCaster = new Three.Raycaster()
    this.mouse = new Three.Vector2()

    window.addEventListener("click", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
      this.rayCaster.setFromCamera(this.mouse, camera)
      // event.mesh = this.mesh
      // event.alarm = this;
      const intersects = this.rayCaster.intersectObjects([this.mesh])
      if (intersects.length > 0) {
        this.fns.forEach((fn) => {
          fn(event)
        })
      }
    })
  }

  onClick(fn) {
    this.fns.push(fn)
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

export default AlarmSprite