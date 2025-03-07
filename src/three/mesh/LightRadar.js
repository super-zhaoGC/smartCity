import * as Three from "three"
import vertex from "@/shader/lightRader/vertex.glsl";
import fragment from "@/shader/lightRader/fragment.glsl";
import gsap from "gsap";
class LightRadar {
  constructor(radius = 2, position = { x: 0, z: 0 }, color = 0xff0000) {
    this.geometry = new Three.PlaneGeometry(radius, radius);
    this.material = new Three.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new Three.Color(color)
        },
        uTime: {
          value: 0
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: Three.DoubleSide,
      transparent: true,
    })

    this.mesh = new Three.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, 1, position.z)
    this.mesh.rotateX(-Math.PI / 2)

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  }
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

export default LightRadar