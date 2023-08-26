import "./style.css";
import * as THREE from "three";

import { init, onInit, onUpdate } from "./three.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";

init(document.getElementById("app"));

const keyMapping = {};
window.addEventListener("keydown", (e) => {
  keyMapping[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keyMapping[e.key] = false;
});

function onKeyHold(key, cb) {
  onUpdate(() => {
    if (keyMapping[key]) {
      cb();
    }
  });
}
function onKeyDown(key, cb) {
  window.addEventListener("keydown", (e) => {
    console.log('keydown')
    if (e.key === key) {
      cb();
    }
  });
}

function onKeyUp(key, cb) {
  window.addEventListener("keyup", (e) => {
    if (e.key === key) {
      cb();
    }
  });
}

function createBox(w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.5,
  });

  const box = new THREE.Mesh(geometry, material);
  // box.castShadow = true;
  box.receiveShadow = true;

  return box;
}

function setCarColor(color, isMatte) {
  carModel.traverse((object) => {
    if (object.userData.isBody) {
      if (isMatte) {
        object.material.metalness = 0;
      } else {
        object.material.metalness = 0.5;
      }
      object.material.color.set(color);
    }
  });
}

// Controls
onInit(({ camera, renderer }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = true;
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.minPolarAngle = (0.4 * Math.PI) / 2;
  controls.maxPolarAngle = (0.9 * Math.PI) / 2;
  // controls.enableZoom = false;

  onUpdate(controls.update);
});

// Lights
onInit(({ scene }) => {
  // const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // dirLight.position.y = 40;
  // dirLight.position.x = 10;
  // dirLight.position.z = 12;

  // dirLight.lookAt(0, 0, 0);
  // dirLight.castShadow = true;

  // dirLight.shadow.camera.top = -10;
  // dirLight.shadow.camera.bottom = 10;
  // dirLight.shadow.camera.left = -10;
  // dirLight.shadow.camera.right = 10;

  // dirLight.shadow.camera.near = 10;
  // dirLight.shadow.camera.far = 200;
  // dirLight.shadow.blurSamples = 30;
  // dirLight.shadow.radius = 8;

  // onKeyHold("w", () => {
  //   dirLight.position.x += 1;
  // });
  // onKeyHold("s", () => {
  //   dirLight.position.x -= 1;
  // });
  // onKeyHold("q", () => {
  //   dirLight.position.y += 1;
  // });
  // onKeyHold("e", () => {
  //   dirLight.position.y -= 1;
  // });
  // onKeyHold("r", () => {
  //   dirLight.position.z += 1;
  // });
  // onKeyHold("f", () => {
  //   dirLight.position.z -= 1;
  // });

  // onKeyDown("d", () => {
  //   console.log(dirLight.position);
  // });

  // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
  // scene.add(dirLight);
});

// Car model
let carModel;
onInit(({ scene, camera, renderer }) => {
  new GLTFLoader().load("/GV60.glb", (model) => {
    carModel = model.scene;

  //   const shadow = new THREE.TextureLoader().load('/shadow.png')

  // const mesh = new THREE.Mesh(
  //   new THREE.PlaneGeometry( 8 * 4,7.1 * 4 ),
  //   new THREE.MeshBasicMaterial( {
  //     map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
  //   } )
  // );
  // mesh.rotation.x = - Math.PI / 2;

  carModel.position.x = -1
  // mesh.renderOrder = 2;
  // carModel.add( mesh );

    carModel.traverse((obj) => {
      // if (obj.isMesh) {

      obj.castShadow = true;
      // }
      if (obj.material) {
        // obj.material.metalness /= 4;
        if (obj.material.color) {
          console.log(obj.material.color.getHex())
          if (obj.material.color.getHex() === 16777215) {
            obj.userData.isBody = true;
            // obj.material.metalness = 0.9;
          }
          // if (obj.material.color.getHex() === 14483456) {
          //   obj.material.color.set("silver");
          //   // object.material.metalness = 0.5;
          // }
        }
      }
    });

    scene.add(model.scene);
  });
});

// Ground
onInit(async ({ scene }) => {
  // const hdrLoader = new RGBELoader();
  // const envMap = hdrLoader.load("/blouberg_sunrise_2_1k.hdr", (envmap) => {
  //   envMap.mapping = THREE.EquirectangularReflectionMapping;
  
  const exrLoader = new RGBELoader();
  // const envMap = exrLoader.load("/piz_compressed.exr", (envmap) => {
  const envMap = exrLoader.load("/forgotten_miniland_2k.hdr", (envmap) => {
  // const envmap = new THREE.TextureLoader().load("/istockphoto-3.jpg");
  // console.log(envmap);

  // const envmap = new THREE.TextureLoader().load("/istock1.jpg");
  // const envmap = new THREE.TextureLoader().load("/istock2.jpg");
  // const envmap = new THREE.TextureLoader().load("/istock3.jpg");
  // const envmap = new THREE.TextureLoader().load("/gettyimages-1.jpg");
  envmap.mapping = THREE.EquirectangularReflectionMapping;
  // envmap.
  // scene.background = envmap;

  let skybox = new GroundProjectedSkybox(envmap);
  skybox.scale.setScalar(100);
  scene.add(skybox);
  // console.log(envmap);
  // /
  // const skybox = new GroundProjectedSkybox(envMap);
  // console.log(skybox);

  // skybox.scale.setScalar(100);
  // scene.add(skybox);

  scene.environment = envmap;
  });

  const ground = createBox(25, 0.01, 25);
  // ground.material.color = new THREE.Color(0x404040);
  ground.position.y = 0;
  // ground.material.transparent = true;
  ground.material = new THREE.MeshStandardMaterial({
    transparent: true,
    // opacity: 0,
  });
  // ground.material.opacity = 0.2;

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("/road.jpg", (texture) => {
    ground.material.map = texture;
  });

  // scene.add(ground);
});

// initialize
onInit(({ camera }) => {
  camera.position.z = -10;

  document.querySelectorAll(".color").forEach((el) => {
    const color = el.getAttribute("data-color");
    el.style.backgroundColor = "#" + color;

    const isMatte = el.hasAttribute("data-matte");

    el.addEventListener("click", () => {
      setCarColor(parseInt("0x" + color), isMatte);
    });
  });
});
