import { IRenderable } from './Interfaces';
import { GroundMesh, Material, MeshBuilder, MultiMaterial, Scene, Vector3 } from '@babylonjs/core';

export default class Board implements IRenderable {
  areas: Area[]
  width: number
  height: number
  boardMaterial: Material
  position: Vector3 = Vector3.Zero();
  boardMesh?: Mesh

  constructor(boardMesh: Mesh, boardMaterial: Material, areas: Area[] = []) {
    this.boardMesh = boardMesh
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