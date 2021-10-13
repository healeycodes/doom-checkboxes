## DOOM via Checkboxes

> I don't think you can really say you've exhaused this until you can run DOOM rendered with checkboxes.

— bartread [on Hacker News](https://news.ycombinator.com/item?id=28826839)

![DOOM WebAssembly loading..](https://github.com/healeycodes/doom-checkboxes/blob/main/loading.png)

[Play it now](..) on (desktop only).

## The Pitch

Bryan Braun gave us [Checkboxland](https://www.bryanbraun.com/checkboxland/), a unique library for rendering text, shapes, and video, via a grid of checkboxes.

Id software gave us [DOOM](https://en.wikipedia.org/wiki/Doom_(franchise)).

Cornelius Diekmann gave us [DOOM via WebAssembly](https://github.com/diekmann/wasm-fizzbuzz).

Today, I'm pleased to stand on top of these giants' shoulders, and give you DOOM via Checkboxes.

![Preview image of DOOM video and DOOM checkboxes](https://github.com/healeycodes/doom-checkboxes/blob/main/preview.png)

## How

DOOM runs via WebAssembly and displays in a hidden `<canvas>`. I use [HTMLCanvasElement.captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream) to turn this into a MediaStream.

A `<video>` element displays this MediaStream and is then consumed by [renderVideo](https://www.bryanbraun.com/checkboxland/#rendervideo) from Checkboxland.

Key events are forwarded to the hidden `<canvas>`

```js
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
```

## Development

```bash
python dev.py
```

Edit files, refresh.
