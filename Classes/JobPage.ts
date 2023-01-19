import { HtmlFetcher } from "./HtmlFetcher";
import { HtmlParser } from "./HtmlParser";

class JobPage {
  private _job: any = {};
  private _isParsed = false;
  private _htmlParser!: HtmlParser;
  constructor(private _url: string, private _selectors: Map<string, string>) {}
  private async _parse() {
    const html = await HtmlFetcher.fetch(this._url);
    this._htmlParser = new HtmlParser(html);
    this._isParsed = true;
  }
  public async scrape() {
    if (!this._isParsed) {
      await this._parse();
      this._selectors.forEach((name: string, selector: string) => {
        this._job[name] = this._htmlParser.selectText(selector);
      });
      this._job["Url"] = this._url;
    }
    return this._job;
  }
}
export { JobPage };
