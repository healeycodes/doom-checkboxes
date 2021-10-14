import { Checkboxland } from "https://unpkg.com/checkboxland?module";
window.Checkboxland = Checkboxland;

const canvas = document.querySelector("canvas");
const video = document.querySelector("#doom-video");
const cbl = new Checkboxland({
    dimensions: "160x100",
    selector: "#checkboxes",
});
window.cbl = cbl;
cbl.print("DOOM WebAssembly loading..");

// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
// Looks like canvas.captureStream() doesn't work unless
//    you've already called canvas.getContext()
canvas.getContext("2d");
setTimeout(() => (video.srcObject = canvas.captureStream()), 0);

document.body.onmousedown = () => {
    if (window.doomLoaded !== true) {
        return;
    }
    cbl.renderVideo(video, { threshold: 20 });
    video.play();
};

const forwardKey = (e, type) => {
    const ev = new KeyboardEvent(type, {
        key: e.key,
        keyCode: e.keyCode,
    });
    canvas.dispatchEvent(ev);
};

document.body.addEventListener("keydown", function(e) {
    forwardKey(e, "keydown");
});

document.body.addEventListener("keyup", function(e) {
    forwardKey(e, "keyup");
});