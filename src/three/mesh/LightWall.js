import * as Three from "three"
import vertex from "@/shader/lightWall/vertex.glsl"
import fragment from "@/shader/lightWall/fragment.glsl"
import gsap from "gsap"
class LightWall {
  constructor() {
    this.geometry = new Three.CylinderGeometry(5, 5, 2, 32, 1, true)
    this.material = new Three.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: Three.DoubleSide,
      transparent: true
    })
    this.mesh = new Three.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 1.5, 0)

    this.mesh.geometry.computeBoundingBox();
    let { max, min } = this.mesh.geometry.boundingBox;
    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    }

    gsap.to(this.mesh.scale, {
      x: 2,
      z: 2,
      duration: 2,
      repeat: -1,
      yoyo: true
    })
  }
}

export default LightWall