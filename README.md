## :joystick: DOOM via Checkboxes
> My blog post: [DOOM Rendered via Checkboxes](https://healeycodes.com/doom-rendered-via-checkboxes)

<br>

![Preview image of DOOM/DOOM checkboxes](https://github.com/healeycodes/doom-checkboxes/blob/main/preview.png)

<br>

[Play it now](https://healeycodes.github.io/doom-checkboxes/) (desktop Chrome/Edge only).

## The Pitch

> I don't think you can really say you've exhaused this until you can run DOOM rendered with checkboxes.

— a commenter wrote [on Hacker News](https://news.ycombinator.com/item?id=28826839)

<br>

Bryan Braun gave us [Checkboxland](https://www.bryanbraun.com/checkboxland/), a unique library for rendering text, shapes, and video, via a grid of checkboxes.

Id software gave us [DOOM](https://en.wikipedia.org/wiki/Doom_(franchise)).

Cornelius Diekmann gave us [DOOM via WebAssembly](https://github.com/diekmann/wasm-fizzbuzz).

Today, I'm pleased to stand on top of these giants' shoulders, and give you DOOM via Checkboxes.

## How

DOOM runs via WebAssembly in a hidden `<canvas>`. I use [HTMLCanvasElement.captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream) to turn this into a MediaStream. A `<video>` element displays this MediaStream and is then consumed by [renderVideo](https://www.bryanbraun.com/checkboxland/#rendervideo) from Checkboxland.

Optionally, the `<video>` element can be hidden as well. However, test users were unable to exit the main menu without the aid of the original hi-res DOOM.

Our screen is a 160 by 100 grid of native checkboxes. Higher resolutions work but FPS drops off dramatically.

```js
const cbl = new Checkboxland({
  dimensions: "160x100",
  selector: "#checkboxes",
});
```

The cursed CSS property [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) is used to shrink the checkboxes down. `transform: scale(x)` resulted in worse performance, and worse visuals. Unfortunately, this means that Firefox users need to manually zoom out.

> Non-standard: This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user.

Key events are forwarded to the hidden `<canvas>` to avoid focus issues.

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

While the `.wasm` is downloaded and processed, the grid displays a message via [print](https://www.bryanbraun.com/checkboxland/#print).

![DOOM WebAssembly loading..](https://github.com/healeycodes/doom-checkboxes/blob/main/loading.png)

Afterwards, the user is instructed to click anywhere (a user action is required so that the `<video>` can be programmatically played) and the game begins!

## Development

```bash
python dev.py
```

Edit files, refresh.
