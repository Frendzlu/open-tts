import { IRenderable } from './Interfaces';
import { GroundMesh, Material, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';

export default class Table implements IRenderable {
  boards: Board[]
  width: number
  height: number
  tableMaterial: Material
  position: Vector3 = Vector3.Zero();
  tableMesh?: GroundMesh

  constructor(width: number, height: number, tableMaterial: Material, boards: Board[] = []) {
    this.boards = boards
    this.width = width
    this.height = height
    this.tableMaterial = tableMaterial
  }
  

  render(scene: Scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: this.width, height: this.height }, scene);
    ground.material = this.tableMaterial

    this.boards.forEach(board => board.render(scene))
  }
}