"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
const parseNumber = (text) => {
    return text ? Number(text.match(/\d/g)?.join("")) : 0;
};
exports.parseNumber = parseNumber;
