const playwright = require("playwright");
const cheerio = require("cheerio");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Tester", "Network Engineer", "Cyber Security", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "Dev-Ops"];

const jobsNumberSelector = "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong";

const jobPostLinkSelector = "#app > div > div.css-1omce3u > div > div > div:nth-child(2) > div > div > div.css-laomuu > h2 > a";

const companySelector = "#app > div > main > article > section.css-dy1y6u > div > strong > div > a";

const locationSelector = "#app > div > main > article > section.css-dy1y6u > div > strong";

const fromSelector = "#app > div > main > article > section.css-dy1y6u > div > span";

const skillsSelector = "#app > div > main > article > section.css-3kx5e2 > div.css-s2o0yh > a > span > span > span";

const experienceSelector = "#app > div > main > article > section.css-3kx5e2 > div:nth-child(2) > span.css-47jx3m > span";

async function scrape(jobTitle) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  const pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  const url = `https://wuzzuf.net/search/jobs/?q=${jobTitle}`;
  await page.goto(url, pageOptions);
  let html = await page.evaluate(() => document.body.innerHTML);
  let $ = cheerio.load(html);
  const jobsNumber = Number($(jobsNumberSelector).text());
  const NumberOfPages = Math.ceil(jobsNumber / 15);
  for (let i = 0; i < NumberOfPages; i++) {
    await page.goto(`${url}&start=${i}`, pageOptions);
    html = await page.evaluate(() => document.body.innerHTML);
    $ = cheerio.load(html);
    const jobsLinks = $(jobPostLinkSelector);
    jobsLinks.each(async (index, link) => {
      const job = {
        job_title: `${$(link).text()}`,
        company: "",
        city: "",
        from: "",
        skills: [],
        YearsOfExperience: "",
        link: `https://wuzzuf.net${$(link).attr("href")}`,
      };
      const jobPage = await browser.newPage();
      await jobPage.goto(job.link, pageOptions);
      html = await jobPage.evaluate(() => document.body.innerHTML);
      $ = cheerio.load(html);
      job.company = $(companySelector).text();
      job.city = $(locationSelector)
        .text()
        .slice($(locationSelector).text().lastIndexOf("-") + 1);
      job.from = $(fromSelector).text();
      job.YearsOfExperience = $(experienceSelector).text();
      $(skillsSelector).each((_, skill) => job.skills.push($(skill).text()));
      job.skills = job.skills.join(",");
      console.log(job);
      jobPage.close();
    });
  }
}
/*
jobTitles.forEach((jobTitle) => {
  scrape(jobTitle);
});*/
scrape("Back-End Developer");
