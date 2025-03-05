import * as Three from 'three'
import gsap from 'gsap'

class FlyLine {
  constructor() {
    let linePoints = [
      new Three.Vector3(0, 0, 0),
      new Three.Vector3(4, 4, 0),
      new Three.Vector3(10, 0, 0)

    ]
    //创建曲线
    this.lineCurve = new Three.CatmullRomCurve3(linePoints)
    //创建纹理
    const textureLoader = new Three.TextureLoader()
    this.texture = textureLoader.load("/textures/z_11.png")
    this.texture.repeat.set(1, 2)
    this.texture.wrapS = Three.RepeatWrapping
    this.texture.wrapT = Three.MirroredRepeatWrapping
    //根据曲线创建管道几何体
    this.geometry = new Three.TubeGeometry(this.lineCurve, 100, 0.4, 2, false)
    this.material = new Three.MeshBasicMaterial({
      color: 0xfff000,
      transparent: true,
      side: Three.DoubleSide,
      map: this.texture

    })
    this.mesh = new Three.Mesh(this.geometry, this.material)

    gsap.to(this.texture.offset, {
      x: -1,
      duration: 3,
      repeat: -1,
      ease: "none",
    })
  }
}

export default FlyLine