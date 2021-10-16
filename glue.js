const canvas = document.getElementById("screen");
const forwardKey = (e, type) => {
  const ev = new KeyboardEvent(type, {
    key: e.key,
    keyCode: e.keyCode,
  });
  canvas.dispatchEvent(ev);
};

document.body.addEventListener("keydown", (e) => forwardKey(e, "keydown"));
document.body.addEventListener("keyup", (e) => forwardKey(e, "keyup"));

let shouldClear = true;
function loop() {
  const base64Image = canvas.toDataURL().replace(/(\r\n|\n|\r)/gm, "");
  if (shouldClear) {
    console.clear();
  }

  for (let i = 0; i < 5; i++) {
    console.log(
      "%c X",
      `font-size:400px;color: transparent;background:url(${base64Image}) no-repeat; background-size: contain;margin-top: 140px;margin-left: 60px;`
    );
  }
  shouldClear = false;
}

setInterval(() => {
  loop();
}, 100);
setInterval(() => {
  shouldClear = true;
}, 3000);
