import { PerspectiveCamera, Spherical, Vector3 } from "three";
import { type numndef } from "./typings" 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { KeyListener } from "./Listener";

export default class OrbitFlyCamera extends PerspectiveCamera {
  domElement: HTMLElement
  distance: number
  controls: OrbitControls
  movementCoefficient: number

  constructor(domElement: HTMLElement, fov?: numndef, aspect?: numndef, near?: numndef, far?: numndef) {
    super(fov, aspect, near, far)
    this.domElement = domElement

    this.controls = new OrbitControls(this, domElement);
    this.controls.enabled = false
    this.controls.enableDamping = true

    this.movementCoefficient = 0.1

    let listener = new KeyListener()
    listener.add("W", () => this.changeAzimuthAngle(-1), true)
    listener.add("S", () => this.changeAzimuthAngle(1), true)
    listener.add("A", () => this.changePolarAngle(1), true)
    listener.add("D", () => this.changePolarAngle(-1), true)
    this.position.set(0, 0, 5);
    this.distance = 5
  }

  changeRadius(radiusChange: number) {
    let sphCoords = new Spherical()
  }
  
  changeAzimuthAngle(amount: number) {
    let targetCoords = this.controls.target.clone()
    let cameraCoords = this.position.clone()
    cameraCoords.sub(targetCoords)
    let sphCoords = new Spherical().setFromCartesianCoords(...cameraCoords.toArray())
    sphCoords.phi += amount * this.movementCoefficient * Math.PI
    if (sphCoords.phi / Math.PI >= 0.5) {
      sphCoords.phi = 0.5 * Math.PI
    } else if (sphCoords.phi / Math.PI <= 0) {
      sphCoords.phi = 0 * Math.PI
    }
    this.lerp(new Vector3().setFromSpherical(sphCoords).add(targetCoords))
  }

  changePolarAngle(amount: number) {
    let targetCoords = this.controls.target.clone()
    let cameraCoords = this.position.clone()
    cameraCoords.sub(targetCoords)
    let sphCoords = new Spherical().setFromCartesianCoords(...cameraCoords.toArray())
    sphCoords.theta += amount * this.movementCoefficient * Math.PI
    this.lerp(new Vector3().setFromSpherical(sphCoords).add(targetCoords))
  }

  //why aren't you smooth??
  lerp(v: Vector3) {
    let alpha = 0
    while (alpha <= 1) {
      setTimeout(() => {
        this.position.lerp(v, alpha)
      })
      alpha += 0.005
    }
  } 
}