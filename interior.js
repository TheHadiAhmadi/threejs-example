import * as THREE from "three";
import { onKeyDown, onKeyHold } from "./keyboard";
import { createBox } from "./lib";
import { onInit } from "./three";

onInit(({ scene, camera }) => {
  console.log(scene, camera);

  document.querySelector("#colors").style.display = "none";

  scene.background = new THREE.Color(0xf0f0f0);
});

onInit(({ scene, camera }) => {
  const box = createBox(10, 10, 10);
  box.material.color.set("red");
  scene.add(box);

  camera.position.set(40, 40, 40);

  onKeyHold("w", () => {
    camera.rotation.y += 0.1;
  });
  onKeyHold("s", () => {
    camera.rotation.y -= 0.1;
  });

  onKeyHold("a", () => {
    camera.rotation.x -= 0.1;
  });

  onKeyHold("d", () => {
    camera.rotation.x += 0.1;
  });
  onKeyHold("r", () => {
    camera.rotation.z += 0.1;
  });
  onKeyHold("f", () => {
    camera.rotation.z -= 0.1;
  });

  onKeyHold("W", () => {
    camera.position.y += 0.1;
  });
  onKeyHold("S", () => {
    camera.position.y -= 0.1;
  });
  onKeyDown("q", () => {
    console.log("rotation", camera.rotation);
  });

  onKeyHold("A", () => {
    camera.position.x -= 0.1;
  });

  onKeyHold("D", () => {
    camera.position.x += 0.1;
  });
  onKeyHold("R", () => {
    camera.position.z += 0.1;
  });
  onKeyHold("F", () => {
    camera.position.z -= 0.1;
  });

  onKeyDown("Q", () => {
    console.log("position", camera.position);
  });

  camera.position.set(19, 3, -1);
});

// Lights
onInit(({ scene }) => {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.y = 0;
  dirLight.position.x = 0;
  dirLight.position.z = 2;

  dirLight.lookAt(0, 0, 0);
  dirLight.castShadow = true;

  dirLight.shadow.camera.top = -10;
  dirLight.shadow.camera.bottom = 10;
  dirLight.shadow.camera.left = -10;
  dirLight.shadow.camera.right = 10;

  dirLight.shadow.camera.near = 10;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.blurSamples = 30;
  dirLight.shadow.radius = 8;

  // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
  scene.add(dirLight);
});
