"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPage = void 0;
const HtmlFetcher_1 = require("./HtmlFetcher");
const HtmlParser_1 = require("./HtmlParser");
class JobPage {
    _url;
    _selectors;
    _job = {};
    _isParsed = false;
    _htmlParser;
    constructor(_url, _selectors) {
        this._url = _url;
        this._selectors = _selectors;
    }
    async _parse() {
        const html = await HtmlFetcher_1.HtmlFetcher.fetch(this._url);
        this._htmlParser = new HtmlParser_1.HtmlParser(html);
        this._isParsed = true;
    }
    async scrape() {
        if (!this._isParsed) {
            await this._parse();
            this._selectors.forEach((name, selector) => {
                this._job[name] = this._htmlParser.selectText(selector);
            });
            this._job["Url"] = this._url;
        }
        return this._job;
    }
}
exports.JobPage = JobPage;
