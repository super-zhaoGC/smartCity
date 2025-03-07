import * as Three from "three"
import vertex from "@/shader/lightWall/vertex.glsl"
import fragment from "@/shader/lightWall/fragment.glsl"
import gsap from "gsap"
class LightWall {
  constructor(radius = 5, length = 2, position = { x: 0, z: 0 }) {
    this.geometry = new Three.CylinderGeometry(radius, radius, 2, 32, 1, true)
    this.material = new Three.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: Three.DoubleSide,
      transparent: true
    })
    this.mesh = new Three.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, 1, position.z)

    this.mesh.geometry.computeBoundingBox();
    let { max, min } = this.mesh.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    }

    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 2,
      repeat: -1,
      yoyo: true
    })
  }

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

export default LightWall