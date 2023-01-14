const playwright = require("playwright");
const { parse } = require("node-html-parser");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Tester", "Network Engineer", "Cyber Security", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "Dev-Ops"];

const jobsNumberSelector = "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong";

const jobPostLinkSelector = "#app > div > div.css-1omce3u > div > div > div:nth-child(2) > div > div > div.css-laomuu > h2 > a";

const companySelector = "#app > div > main > article > section.css-dy1y6u > div > strong > div > a";

const locationSelector = "#app > div > main > article > section.css-dy1y6u > div > strong";

const fromSelector = "#app > div > main > article > section.css-dy1y6u > div > span";

const skillsSelector = "#app > div > main > article > section.css-3kx5e2 > div.css-s2o0yh > a > span > span > span";

const experienceSelector = "#app > div > main > article > section.css-3kx5e2 > div:nth-child(2) > span.css-47jx3m > span";

let browser;

const loadHtml = async (url) => {
  const pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  const page = await browser.newPage();
  await page.goto(url, pageOptions);
  let html = await page.evaluate(() => document.body.innerHTML);
  page.close();
  return parse(html);
};

const scrapeJobPage = async (jobLink) => {
  const jobPage = await loadHtml(`https://wuzzuf.net${jobLink.getAttribute("href")}`);
  const job = {
    job_title: jobLink.innerHTML,
    company: jobPage.querySelector(companySelector) ? jobPage.querySelector(companySelector).innerText : "",
    city: jobPage.querySelector(locationSelector)?.innerText.split(";")[1],
    from: jobPage.querySelector(fromSelector).innerText,
    skills: [],
    YearsOfExperience: jobPage.querySelector(experienceSelector).innerText,
    link: `https://wuzzuf.net${jobLink.getAttribute("href")}`,
  };
  jobPage.querySelectorAll(skillsSelector).forEach((skill, index) => job.skills.push(skill.innerText));
  job.skills = job.skills.join(",");
  console.log(job);
};

async function scrape(jobTitle) {
  browser = await playwright.chromium.launch();
  const url = `https://wuzzuf.net/search/jobs/?q=${jobTitle}`;
  let searchPage = await loadHtml(url);
  const jobsNumber = Number(searchPage.querySelector(jobsNumberSelector).innerText);
  console.log(jobsNumber);
  const NumberOfPages = Math.ceil(jobsNumber / 15);
  for (let i = 0; i < 1; i++) {
    searchPage = await loadHtml(`${url}&start=${i}`);
    const jobsLinks = searchPage.querySelectorAll(jobPostLinkSelector);
    for (const jobLink of jobsLinks) {
      await scrapeJobPage(jobLink);
    }
  }
  browser.close();
}
/*
jobTitles.forEach((jobTitle) => {
  scrape(jobTitle);
});*/
scrape("Back-End Developer");
