import * as THREE from "three";

let scene;
let camera;
let renderer;

let updateCallbacks = [];
let initCallbacks = [];
export function onUpdate(cb) {
  updateCallbacks.push(cb);
}

export function onInit(cb) {
  if (scene) {
    cb({ scene, camera, renderer });
  } else {
    initCallbacks.push(cb);
  }
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
  renderer.setSize(window.innerWidth, window.innerHeight);

  initCallbacks.map((cb) => cb({ scene, camera, renderer }));

  function animate() {
    updateCallbacks.map((cb) => cb());
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
  animate();
}
