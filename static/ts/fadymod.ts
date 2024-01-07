// Object.defineProperty(exports, "__esModule", { value: true });
// const supabase_js_1 = require("@supabase/supabase-js");
export class Fady {
  constructor() {}
  insertYear(span: any) {
    let y = new Date().getFullYear();
    span.textContent = y;
  }
  isValidYtUrl(url: string) {
    let youtubeUrlRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_\-]{11})$/;
    return youtubeUrlRegex.test(url);
  }
}
class Youtube {
  u: any;
  constructor(url: any) {
    let f = new Fady();
    this.u = url;
    if (f.isValidYtUrl(this.u) === false) {
      console.log("Invalid youtube link");
    }
  }
  /**
   *
   * @example
   * const yt = new Youtube(url)
   * // getting info of video
   * const data = await yt.info()
   * console.log(data)
   * @returns Promise with Object Just put (await) before obj.info()
   */
  async info() {
    // let title, authorName, thumbnailUrl;
    let apiUrl =
      "https://www.youtube.com/oembed?url=" +
      encodeURIComponent(this.u) +
      "&format=json";
    try {
      let data: any = (await fetch(apiUrl)).json();
      delete data.width;
      delete data.version;
      delete data.height;
      delete data.provider_name;
      delete data.provider_url;
      return data;
    } catch (reason) {
      console.log(reason);
    }
  }
  insert_info(elementsArr = []) {
    let data: any = this.info();
    for (let i = 0; i < elementsArr.length; i++) {
      const element: any = elementsArr[i] as HTMLElement;
      const key = Object.keys(data)[i];
      element.hasAttribute("src")
        ? (element.src = data[key])
        : (element.textContent = data[key]);
    }
  }
}
/**
 * @param {URL} url
 * @param {...any} arrOfElement
 * @example let url = inp.value
const elements = [videoTitle , authorName , authorURL , thURL , vidIframe]
YoutubeApp(url , func_load , elements)
 * @returns info
 */
function YoutubeApp(url: any, arrOfElement: never[] | undefined) {
  const yt = new Youtube(url);
  const info = yt.info();
  yt.insert_info(arrOfElement);
}
function show(element: { style: { display: string } }, display = "block") {
  element.style.display = display;
}
function show_block(element: { style: { display: string } }) {
  element.style.display = "block";
}
function show_flex(element: { style: { display: string } }) {
  element.style.display = "flex";
}
function show_grid(element: { style: { display: string } }) {
  element.style.display = "grid";
}
/**
 * You should do fade out animation with class name
 */
function fadeout_remove(
  el: { classList: { add: (arg0: any) => void }; remove: () => void },
  time: number | undefined,
  fadeClassName: any
) {
  el.classList.add(fadeClassName);
  setTimeout(() => {
    el.remove();
  }, time);
}
// let script = document.createElement("script");
// script.src = "https://unpkg.com/@supabase/supabase-js@2";
// document.body.appendChild(script);

/**
 * @example
 * let comment = new Data({
 *  comment: "This is a comment",
 *  table: "comment", // table name depend on supabase account
 * })
 * // fetch all the data of the table
 * let data = await comment.getData()
 * comment.submit("username")
 */
class Data {
  obj: { [x: string]: any };
  com: any;
  tableName: any;
  apiUrl: string;
  apikey: string;
  client: any;
  static supabase_js_1: any;
  constructor(obj: { [x: string]: any }) {
    this.obj = obj;
    this.com = obj["comment"];
    this.tableName = obj["table"];
    this.tableName === undefined
      ? (this.tableName = "comment")
      : (this.tableName = obj["table"]);
    this.apiUrl = "https://zqjgdgfntxqoybwghjiq.supabase.co";
    this.apikey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamdkZ2ZudHhxb3lid2doamlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzkwMjg2MiwiZXhwIjoyMDAzNDc4ODYyfQ.sBVfZx_-GiRF8tJZqAZbVDXD9WhEL77oXAWtuzo3_n0";
    this.client = (0, Data.supabase_js_1.createClient)(
      this.apiUrl,
      this.apikey
    );
  }
  submit(username = "User") {
    const supabase = (0, Data.supabase_js_1.createClient)(
      this.apiUrl,
      this.apikey
    );
    let submision: any;
    submision["comment"] = this.com;
    submision["username"] = username;
    const { data, error } = supabase.from(this.tableName).insert([submision]);
    console.log({ data, error });
  }
  /**
   *
   * @returns Array
   * @example
   * let comment = new Comment({
   *  comment: "This is a comment",
   *  table: "comment",
   * })
   * let data = await comment.getData()
   */
  getData() {
    const data = this.client.from(this.tableName).select("*")["data"];
    return data;
  }
}
class Comment extends Data {
  constructor(obj: any) {
    super(obj);
  }
}
// save class
/**
 * @example
 * const sv = new Save({
 * "val" : "This text is important to save."
 * })
 * sv.Localsave()
 * sv.getVal(element)
 */
class Save {
  obj: { [s: string]: unknown } | ArrayLike<unknown>;
  val: any;
  constructor(info: { [s: string]: unknown } | ArrayLike<unknown>) {
    this.obj = info;
    this.val = Object.values(info)[0];
  }
  Localsave() {
    localStorage.setItem(Object.keys(this.obj)[0], this.val);
  }
  getVal(element: { value: string | null }, is_input = false) {
    let val = localStorage.getItem(Object.keys(this.obj)[0]);
    element.value = val;
  }
}

export function selectInpsOnfocus(arrInps: any[]) {
  arrInps.forEach((inp: { onfocus: () => void; select: () => void }) => {
    inp.onfocus = () => {
      inp.select();
    };
  });
}
