import * as playwright from "playwright";

class Browser {
  private static instance: playwright.Browser;

  private constructor() {}

  public static async getInstance(): Promise<playwright.Browser> {
    if (!this.instance?.isConnected()) {
      this.instance = await playwright.chromium.launch();
    }
    return this.instance;
  }
}
export { Browser };
