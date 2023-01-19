import { Browser } from "./Browser";
type pageOptions = {
  referer?: string | undefined;
  timeout?: number | undefined;
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit" | undefined;
};

class HtmlFetcher {
  constructor() {}
  public static async fetch(url: string) {
    const browser = await Browser.getInstance();
    const page = await browser.newPage();
    const pageOptions: pageOptions = {
      waitUntil: "load",
      timeout: 0,
    };
    while (true) {
      try {
        await page.goto(url, pageOptions);
      } catch (e) {
        continue;
      }
      break;
    }
    const html = await page.content();
    await page.close();
    await browser.close();
    return html;
  }
}
export { HtmlFetcher };
