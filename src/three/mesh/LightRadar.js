import * as Three from "three"
import vertex from "@/shader/lightRader/vertex.glsl";
import fragment from "@/shader/lightRader/fragment.glsl";
import gsap from "gsap";
class LightRadar {
  constructor() {
    this.geometry = new Three.PlaneGeometry(2, 2);
    this.material = new Three.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new Three.Color(0xff0000)
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
    this.mesh.position.set(-10, 1, 2)
    this.mesh.rotateX(-Math.PI / 2)

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  }
}

export default LightRadar