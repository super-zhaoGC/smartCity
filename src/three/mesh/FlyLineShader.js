import * as Three from "three"
import gsap from "gsap"
import vertex from "@/shader/flyLine/vertex.glsl"
import fragment from "@/shader/flyLine/fragment.glsl"

class FlyLineShader {
  constructor() {
    const linePoints = [
      new Three.Vector3(0, 0, 0),
      new Three.Vector3(-4, 4, 0),
      new Three.Vector3(-10, 0, 0)
    ]
    this.lineCurve = new Three.CatmullRomCurve3(linePoints)
    const points = this.lineCurve.getPoints(1000)
    // console.log("points", points);

    this.geometry = new Three.BufferGeometry().setFromPoints(points)

    this.aSizeArray = new Float32Array(points.length)
    for (let i = 0; i < this.aSizeArray.length; i++) {
      this.aSizeArray[i] = i
    }
    // console.log("this.aSizeArray", this.aSizeArray);
    this.geometry.setAttribute("aSize", new Three.BufferAttribute(this.aSizeArray, 1))

    this.shaderMaterial = new Three.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new Three.Color(0xffff00)
        },
        uLength: {
          value: points.length
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: Three.AdditiveBlending,
    })
    this.mesh = new Three.Points(this.geometry, this.shaderMaterial)

    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 2,
      repeat: -1,
      ease: "none"
    })
  }

}
export default FlyLineShader