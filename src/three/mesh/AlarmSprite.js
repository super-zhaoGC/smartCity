import * as Three from "three"
import camera from "../camera"

class AlarmSprite {
  constructor() {
    const textureLoader = new Three.TextureLoader()
    const texture = textureLoader.load("/textures/警告.png")
    this.spriteMaterial = new Three.SpriteMaterial({ map: texture })
    this.mesh = new Three.Sprite(this.spriteMaterial)
    this.mesh.position.set(-4.5, 3.5, -1)
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
}

export default AlarmSprite