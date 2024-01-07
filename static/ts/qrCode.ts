let msgElement = document.querySelector("#errMsg");
let qrCode;
let input = document.querySelector("input") as HTMLInputElement;
let dataInp = document.querySelector(".title") as HTMLElement;
let thDiv = document.querySelector(".thDiv") as HTMLSpanElement;
let size_span = document.querySelector(
  ".thDiv .thImgDiv button span"
) as HTMLElement;
let qrimg = document.querySelector(".thImg") as HTMLImageElement;
const genBtn = document.querySelector("[data-gen]") as HTMLButtonElement;

genBtn.addEventListener("click", async () => {
  if (input.value.trim() == "") {
    return;
  } else {
    let file = await (
      await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}`
      )
    ).blob();
    thDiv.classList.remove("hidden");
    qrimg.style.width = "250px";
    qrimg.style.height = "250px";
    size_span.textContent = `(${String(file.size)} Bytes)`;
    try {
      qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}`;
    } catch (reason: any) {
      throw new Error(reason);
    }
    qrimg.src = qrCode;
  }
});

const downBtn = document.querySelector("[data-down]") as HTMLButtonElement;

downBtn.addEventListener("click", async () => {
  let file = await (
    await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input.value}`
    )
  ).blob();

  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = "Qr";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

function showMsg(el: any, msg: string, des = "red") {
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
