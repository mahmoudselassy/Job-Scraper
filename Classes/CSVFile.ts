import * as fs from "fs";
import { stringify } from "csv-stringify";
class CSVFile {
  constructor(public fileName: string, public dir: string, public columns: string[]) {
    fs.writeFileSync(`${this.dir}/${this.fileName}.csv`, "");
    stringify(
      [],
      {
        header: true,
        columns: this.columns,
      },
      (err: Error | undefined, output: string) => fs.appendFileSync(`${this.dir}/${this.fileName}.csv`, output)
    );
  }
  public insertRow(row: any) {
    stringify([row], (err: Error | undefined, output: string) => fs.appendFileSync(`${this.dir}/${this.fileName}.csv`, output));
  }
}
export { CSVFile };
