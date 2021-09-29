"use strict";
import { toBlob } from "./_snowpack/pkg/html-to-image.js";
import { saveAs } from "./_snowpack/pkg/file-saver.js";

export function setupTy() {
  const textElement = document.getElementById("billboard-text");
  const imageElement = document.getElementById("billboard-image");

  const textFormElement = document.getElementById("text");
  const imageFormElement = document.getElementById("image");

  const imgButton = document.getElementById("get-image");

  imgButton.addEventListener("click", () => {
    const node = document.getElementById("billboard");
    toBlob(node).then((blob) => {
      saveAs(blob, "topicus-billboard.png");
    });
  });

  textFormElement.addEventListener("input", onInput);
  imageFormElement.addEventListener("input", onInput);

  function onInput() {
    const txt = textFormElement.value;
    const img = imageFormElement.value;
    setBillboardContent(txt, img);
  }

  function setBillboardContent(text, image) {
    textElement.childNodes[0].innerText = text;
    imageElement.style.backgroundImage = `url(${image})`;
    console.debug("SETTING IMAGE", image);

    const params = new URLSearchParams(window.location.search);
    params.set("text", text);
    params.set("image", image);
    window.history.replaceState(null, null, `?${params.toString()}`);

    if (text && textFormElement.value !== text) {
      textFormElement.value = text;
    }
    if (imageFormElement.value !== image) {
      imageFormElement.value = image;
    }
  }

  const params = new URLSearchParams(window.location.search);
  const text = params.get("text");
  const image = params.get("image");
  if (
    text &&
    image &&
    (text !== textFormElement.value || image !== imageFormElement.value)
  ) {
    setBillboardContent(text, image);
  }
}
