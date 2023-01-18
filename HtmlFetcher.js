"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlFetcher = void 0;
const Browser_1 = require("./Browser");
const node_html_parser_1 = require("node-html-parser");
class HtmlFetcher {
    url;
    _html = (0, node_html_parser_1.parse)("");
    _pageOptions = {
        waitUntil: "load",
        timeout: 0,
    };
    constructor(url) {
        this.url = url;
    }
    async fetch() {
        const browser = await Browser_1.Browser.getInstance();
        const page = await browser.newPage();
        while (true) {
            try {
                await page.goto(this.url, this._pageOptions);
            }
            catch (e) {
                continue;
            }
            break;
        }
        this._html = (0, node_html_parser_1.parse)(await page.evaluate(() => document.body.innerHTML));
        await page.close();
        await browser.close();
        return this._html;
    }
    get html() {
        return this._html;
    }
}
exports.HtmlFetcher = HtmlFetcher;
