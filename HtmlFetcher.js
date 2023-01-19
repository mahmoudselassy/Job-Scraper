"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlFetcher = void 0;
const Browser_1 = require("./Browser");
class HtmlFetcher {
    constructor() { }
    static async fetch(url) {
        const browser = await Browser_1.Browser.getInstance();
        const page = await browser.newPage();
        const pageOptions = {
            waitUntil: "load",
            timeout: 0,
        };
        while (true) {
            try {
                await page.goto(url, pageOptions);
            }
            catch (e) {
                continue;
            }
            break;
        }
        const html = await page.evaluate(() => document.body.innerHTML);
        await page.close();
        await browser.close();
        return html;
    }
}
exports.HtmlFetcher = HtmlFetcher;
