import { HtmlFetcher } from "./HtmlFetcher";
import { HtmlParser, HTMLElement } from "./HtmlParser";
import { parseNumber } from "./UtilityFunctions";
class SearchPage {
  private _jobsNumber = 0;
  private _jobsUrls: string[] = [];
  private _isParsed = false;
  private _htmlParser?: HtmlParser;
  constructor(private _url: string, private _jobsNumberSelector: string, private _jobPostLinkSelector: string) {}
  private async _parse() {
    const html = await HtmlFetcher.fetch(this._url);
    this._htmlParser = new HtmlParser(html);
    this._isParsed = true;
  }
  public async scrapeJobsNumber() {
    if (!this._isParsed) {
      await this._parse();
      this._jobsNumber = parseNumber(this._htmlParser?.selectText(this._jobsNumberSelector)!);
    }
    return this._jobsNumber;
  }
  public async scrapeJobsLinks() {
    if (!this._isParsed) {
      await this._parse();
      this._htmlParser?.selectAllElements(this._jobPostLinkSelector).map((a: HTMLElement, index: number) => {
        this._jobsUrls.push(`https://wuzzuf.net${a.getAttribute("href")}`.split("?")[0]);
      });
    }
    return this._jobsUrls;
  }
}
export { SearchPage };
