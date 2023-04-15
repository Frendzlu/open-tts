import { Mesh, Scene, Vector3 } from "@babylonjs/core"
import { IMeshInfo } from './Interfaces';

export interface IRenderable {
  width: number
  height: number
  position: Vector3

  render: (scene: Scene) => void
}

export interface ICompoundMeshInfo {
  rpnEquation: string
  meshIndex: {[key: string]: IMeshInfo }
}

type meshTypes = "Cylinder" | "Box" | "Sphere" | "Capsule" | "Torus"

interface ICylinderInfo {
  
}

interface ICylinderInfo {
  
}

interface ICylinderInfo {
  
}


interface MeshMap {
  Cylinder: {}
  Box: {}
  Sphere: {}
  Capsule: {}
  Torus: {}
}