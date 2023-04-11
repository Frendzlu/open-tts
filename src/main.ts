import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { KeyListener } from './Listener';
import OrbitFlyCamera from './OrbitFlyCamera';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new OrbitFlyCamera(renderer.domElement, 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xff0000 }));
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(line)

let debug = document.getElementById("sus")!
function animate() {
  requestAnimationFrame(animate);
  let sphCoords = new THREE.Spherical().setFromCartesianCoords(...camera.position.toArray())
  debug.innerText = `${(sphCoords.radius).toFixed(3)}\n${(sphCoords.phi).toFixed(3)}\n${(sphCoords.theta).toFixed(3)}`
  camera.controls.update()
  renderer.render(scene, camera);
}
animate();