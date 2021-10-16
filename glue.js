const canvas = document.querySelector("canvas");
const video = document.querySelector("#doom-video");
// https://bugzilla.mozilla.org/show_bug.cgi?id=1572422
// Looks like canvas.captureStream() doesn't work unless
//    you've already called canvas.getContext()
canvas.getContext("2d");
setTimeout(() => (video.srcObject = canvas.captureStream()), 0);

document.body.onmousedown = () => {
    if (window.doomLoaded !== true) {
        return;
    }
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