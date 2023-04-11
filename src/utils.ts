import * as THREE from 'three';

export function getCameraShift(cameraRotation: THREE.Euler, distance: number): THREE.Vector3 {
  let pitch = cameraRotation.x
  let yaw = cameraRotation.y
  let roll = cameraRotation.z
  let x2 = distance**2/(1 + Math.tan(roll)**2 + 1/Math.tan(yaw)**2)
  let y2 = distance**2/(1 + 1/Math.tan(pitch)**2 + 1/Math.tan(roll)**2)
  let z2 = distance**2/(1 + Math.tan(pitch)**2 + Math.tan(yaw)**2)
  // let y2 = distance**2*Math.sin(roll)**2
  // let x2 = (distance**2 - y2)*(Math.cos(yaw)**2 - 1)
  // let z2 = y2 * (1/(Math.sin(pitch)**2) - 1)
  return new THREE.Vector3(Math.sqrt(x2), Math.sqrt(y2)+3, Math.sqrt(z2))
}