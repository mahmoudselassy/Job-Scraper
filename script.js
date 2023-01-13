const playwright = require("playwright");
const cheerio = require("cheerio");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Tester", "Network Engineer", "Cyber Security", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "Dev-Ops"];

const jobsNumberSelector = "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong";

const jobPostLinkSelector = "#app > div > div.css-1omce3u > div > div > div:nth-child(2) > div > div > div.css-laomuu > h2 > a";

async function scrape(jobTitle) {
  const browser = await playwright.chromium.launch({});
  const page = await browser.newPage();
  const pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  const url = `https://wuzzuf.net/search/jobs/?q=${jobTitle}`;
  await page.goto(url, pageOptions);
  const html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  const jobsNumber = Number($(jobsNumberSelector).text());

  /* 
  const NumberOfPages = Math.ceil(jobsNumber / 15);
  for (let i = 0; i < NumberOfPages; i++) {
    await page.goto(`${url}&start=${i}`, pageOptions);
    const jobsLinks = await page.$$(jobPostLinkSelector);
    for (const jobsLink of jobsLinks) {
      console.log(await (await jobsLink.getProperty("href")).jsonValue());
    }
  }*/
  browser.close();
}
/*
jobTitles.forEach((jobTitle) => {
  scrape(jobTitle);
});*/
scrape("Back-End Developer");
