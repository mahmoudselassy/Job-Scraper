"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
const HtmlFetcher_1 = require("./HtmlFetcher");
const HtmlParser_1 = require("./HtmlParser");
const UtilityFunctions_1 = require("./UtilityFunctions");
class SearchPage {
    _url;
    _jobsNumberSelector;
    _jobPostLinkSelector;
    _jobsNumber = 0;
    _jobsUrls = [];
    _isParsed = false;
    _htmlParser;
    constructor(_url, _jobsNumberSelector, _jobPostLinkSelector) {
        this._url = _url;
        this._jobsNumberSelector = _jobsNumberSelector;
        this._jobPostLinkSelector = _jobPostLinkSelector;
    }
    async _parse() {
        const html = await HtmlFetcher_1.HtmlFetcher.fetch(this._url);
        this._htmlParser = new HtmlParser_1.HtmlParser(html);
        this._isParsed = true;
    }
    async scrapeJobsNumber() {
        if (!this._isParsed) {
            await this._parse();
            this._jobsNumber = (0, UtilityFunctions_1.parseNumber)(this._htmlParser?.selectText(this._jobsNumberSelector));
        }
        return this._jobsNumber;
    }
    async scrapeJobsLinks() {
        if (!this._isParsed) {
            await this._parse();
            this._htmlParser?.selectAllElements(this._jobPostLinkSelector).map((a, index) => {
                this._jobsUrls.push(`https://wuzzuf.net${a.getAttribute("href")}`.split("?")[0]);
            });
        }
        return this._jobsUrls;
    }
}
exports.SearchPage = SearchPage;
