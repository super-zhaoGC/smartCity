import * as Three from "three"

class MeshLine {
  constructor(geometry) {
    const edges = new Three.EdgesGeometry(geometry)
    this.material = new Three.LineBasicMaterial({ color: 0xffffff })
    const line = new Three.LineSegments(edges, this.material)
    this.geometry = edges;
    this.mesh = line;
  }
}

export default MeshLine