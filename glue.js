const canvas = document.querySelector("canvas");
const video = document.querySelector("#doom-video");

setTimeout(() => (video.srcObject = canvas.captureStream()), 0);

document.body.onmousedown = () => {
  if (window.doomLoaded !== true) {
    return;
  }
  video.play();

  requestLocalFileFrame(false);
};

function onInitFs(fs, assumeFileAlreadyExists) {
  fs.root.getFile(
    "current_frame.png",
    { create: assumeFileAlreadyExists, exclusive: true },
    (fe) => {
      canvas.toBlob((blob) => {
        fe.createWriter((fw) => {
          fw.write(blob);

          fe.file((f) => {
            console.log(f);
          }, errorHandler);
        }, errorHandler);
      });
    },
    errorHandler
  );

  /* do something with filesystem.root, which is a DirectoryEntry,
     just as you would with `chrome.fileSystem.chooseEntry` */
}
function errorHandler(e) {
  let msg = "";
  console.log(e);
  switch (e.code) {
    case 13:
      msg = "File already exists. Attempting to read now...";
      break;
    //   case FileError.QUOTA_EXCEEDED_ERR:
    //     msg = 'QUOTA_EXCEEDED_ERR';
    //     break;
    //   case FileError.NOT_FOUND_ERR:
    //     msg = 'NOT_FOUND_ERR';
    //     break;
    //   case FileError.SECURITY_ERR:
    //     msg = 'SECURITY_ERR';
    //     break;
    //   case FileError.INVALID_MODIFICATION_ERR:
    //     msg = 'INVALID_MODIFICATION_ERR';
    //     break;
    //   case FileError.INVALID_STATE_ERR:
    //     msg = 'INVALID_STATE_ERR';
    //     break;
    //   default:
    //     msg = 'Unknown Error';
    //     break;
  }
  console.log(`ERROR: ${msg}`);
  if (e.code === 13) requestLocalFileFrame(true);
}

const requestLocalFileFrame = (assumeFileAlreadyExists = false) => {
  window.webkitRequestFileSystem(
    window.TEMPORARY,
    5 *
      1024 *
      1024 /* 5MB, adjust as needed, may require "unlimitedStorage" permission */,
    (fs) => {
      onInitFs(fs, assumeFileAlreadyExists);
    },
    errorHandler
  );
};

const forwardKey = (e, type) => {
  const ev = new KeyboardEvent(type, {
    key: e.key,
    keyCode: e.keyCode,
  });
  canvas.dispatchEvent(ev);
};

document.body.addEventListener("keydown", function (e) {
  forwardKey(e, "keydown");
});

document.body.addEventListener("keyup", function (e) {
  forwardKey(e, "keyup");
});
