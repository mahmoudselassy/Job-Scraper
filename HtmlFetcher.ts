import { Browser } from "./Browser";
import { parse, HTMLElement } from "node-html-parser";
type pageOptions = {
  referer?: string | undefined;
  timeout?: number | undefined;
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined;
};

class HtmlFetcher {
  private _html: HTMLElement = parse("");
  private _pageOptions: pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  constructor(public url: string) {}
  public async fetch() {
    const browser = await Browser.getInstance();
    const page = await browser.newPage();
    while (true) {
      try {
        await page.goto(this.url, this._pageOptions);
      } catch (e) {
        continue;
      }
      break;
    }
    this._html = parse(await page.evaluate(() => document.body.innerHTML));
    await page.close();
    await browser.close();
    return this._html;
  }
  public get html() {
    return this._html;
  }
}
export { HtmlFetcher };
