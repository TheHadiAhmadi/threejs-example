import * as THREE from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';


let scene;
let camera;
let renderer;

let updateCallbacks = [];
export function onUpdate(cb) {
  updateCallbacks.push(cb);
}

export function onInit(cb) {
  cb({ scene, camera, renderer });
}

export function init(element) {
  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x999999);

  const aspect = window.innerWidth / window.innerHeight;

  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: element,
  });

  renderer.shadowMap.enabled = true;
  // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth * 4, window.innerHeight * 4, false);

  // renderer.setSize(width * 2, height * 2, false);,


  // let composer = new EffectComposer( renderer );
  // composer.setPixelRatio(window.devicePixelRatio);
  // composer.setSize(window.innerWidth, window.innerHeight);
  // const renderPass = new RenderPass( scene, camera );
  // composer.addPass( renderPass );


  function animate() {
    updateCallbacks.map((cb) => cb());
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
  animate();
}
