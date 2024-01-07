import { Fady, selectInpsOnfocus } from "./fadymod.js";

const inp = document.querySelector("#url") as HTMLInputElement;
const ninp = document.querySelector("#ninp") as HTMLInputElement;
const btn = document.querySelector(".pubtn") as HTMLButtonElement;
const msg = document.querySelector("#errMsg") as HTMLElement;
const regx = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const youtubeRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;

inp.addEventListener("input", () => {
  regx.test(inp.value) ? okbtn() : notok();
  if (youtubeRegex.test(inp.value) || inp.value.includes("youtube")) {
    notok();
    showMsg(
      msg,
      `Can't download video<br>Recommended: (youtube app)`,
      "yellow"
    );
  }
});

btn.addEventListener("click", function () {
  fetch(inp.value)
    .then((res) => res.blob())
    .then((file) => {
      let url = URL.createObjectURL(file);
      let atag = document.createElement("a");
      atag.href = url;
      atag.download = ninp.value;
      document.body.appendChild(atag);
      atag.click();
      atag.remove();
    });
});

export function showMsg(el: any, msg: any, des = "red") {
  el.classList.remove("hidden");
  el.classList.remove("errMsg");
  el.classList.remove("warnMsg");
  el.classList.remove("sucMsg");
  if (des == "red") {
    setTimeout(() => {
      el.classList.add("errMsg");
    }, 0);
  } else if (des == "green") {
    setTimeout(() => {
      el.classList.add("sucMsg");
    }, 0);
  } else if (des == "yellow") {
    setTimeout(() => {
      el.classList.add("warnMsg");
    }, 0);
  }
  el.innerHTML = msg;
}

async function okbtn() {
  let file = await (await fetch(inp.value)).blob();
  ninp.value = `file.${file["type"].slice(file["type"].indexOf("/") + 1)}`;
  let span_size: any = document.querySelector(".nDiv p span");
  span_size.textContent = `${String((file["size"] / 1024).toFixed(2))}KB`;
  btn.classList.remove("dis");
  document.querySelector(".nDiv")?.classList.remove("hidden");
}

function notok() {
  btn.classList.add("dis");
  document.querySelector(".nDiv")?.classList.add("hidden");
}

new Fady().insertYear(document.querySelector(".copyright p span"));

selectInpsOnfocus([inp, ninp]);
