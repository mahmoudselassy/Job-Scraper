import { parse, HTMLElement } from "node-html-parser";

class HtmlParser {
  private _htmlElement: HTMLElement;
  constructor(public html: string) {
    this._htmlElement = parse(html);
  }
  public selectText(selector: string) {
    return this._htmlElement.querySelector(selector)?.textContent;
  }
  public selectAllElements(selector: string) {
    return this._htmlElement.querySelectorAll(selector);
  }
}
export { HtmlParser, HTMLElement };
