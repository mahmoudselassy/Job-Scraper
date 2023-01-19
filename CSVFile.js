"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVFile = void 0;
const fs = __importStar(require("fs"));
const csv_stringify_1 = require("csv-stringify");
class CSVFile {
    fileName;
    dir;
    columns;
    constructor(fileName, dir, columns) {
        this.fileName = fileName;
        this.dir = dir;
        this.columns = columns;
        fs.writeFileSync(`${this.dir}/${this.fileName}.csv`, "");
        (0, csv_stringify_1.stringify)([], {
            header: true,
            columns: this.columns,
        }, (err, output) => fs.appendFileSync(`${this.dir}/${this.fileName}.csv`, output));
    }
    insertRow(row) {
        (0, csv_stringify_1.stringify)([row], (err, output) => fs.appendFileSync(`${this.dir}/${this.fileName}.csv`, output));
    }
}
exports.CSVFile = CSVFile;
