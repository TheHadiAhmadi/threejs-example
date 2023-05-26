import * as THREE from "three";

export function createBox(w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.5,
  });

  const box = new THREE.Mesh(geometry, material);
  // box.castShadow = true;
  box.receiveShadow = true;

  return box;
}

