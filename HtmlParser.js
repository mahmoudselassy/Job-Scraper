"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLElement = exports.HtmlParser = void 0;
const node_html_parser_1 = require("node-html-parser");
Object.defineProperty(exports, "HTMLElement", { enumerable: true, get: function () { return node_html_parser_1.HTMLElement; } });
class HtmlParser {
    html;
    _htmlElement;
    constructor(html) {
        this.html = html;
        this._htmlElement = (0, node_html_parser_1.parse)(html);
    }
    selectText(selector) {
        return this._htmlElement.querySelector(selector)?.textContent;
    }
    selectAllElements(selector) {
        return this._htmlElement.querySelectorAll(selector);
    }
}
exports.HtmlParser = HtmlParser;
