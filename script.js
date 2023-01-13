const playwright = require("playwright");

async function scrape() {
    const browser = await playwright.chromium.launch({});

    const page = await browser.newPage();
    await page.goto("https://wuzzuf.net/search/jobs/?q=Backend+Engineer", {
        waitUntil: "load",
    });
    /* await page.waitForSelector(
        "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2"
    );*/
    const num = await page.$eval(
        "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong",
        (el) => el.textContent
    );
    console.log(num);
    await browser.close();
}
scrape();
