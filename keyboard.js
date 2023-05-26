import { onUpdate } from "./three";

const keyMapping = {};
window.addEventListener("keydown", (e) => {
  keyMapping[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keyMapping[e.key] = false;
});

export function onKeyHold(key, cb) {
  onUpdate(() => {
    if (keyMapping[key]) {
      cb();
    }
  });
}
export function onKeyDown(key, cb) {
  window.addEventListener("keydown", (e) => {
    if (e.key === key) {
      cb();
    }
  });
}

export function onKeyUp(key, cb) {
  window.addEventListener("keyup", (e) => {
    if (e.key === key) {
      cb();
    }
  });
}
