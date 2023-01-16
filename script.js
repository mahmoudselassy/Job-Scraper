const playwright = require("playwright");
const fs = require("fs");
const csv = require("csv-stringify");
const { parse } = require("node-html-parser");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Software Tester", "Network Engineer", "Cyber Security Engineer", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "DevOps Engineer"];

const jobsNumberSelector = "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong";

const jobPostLinkSelector = "#app > div > div.css-1omce3u > div > div > div:nth-child(2) > div > div > div.css-laomuu > h2 > a";

const companySelector = "#app > div > main > article > section.css-dy1y6u > div > strong > div > a";

const locationSelector = "#app > div > main > article > section.css-dy1y6u > div > strong";

const fromSelector = "#app > div > main > article > section.css-dy1y6u > div > span";

const skillsSelector = "#app > div > main > article > section.css-3kx5e2 > div.css-s2o0yh > a > span > span > span";

const experienceSelector = "#app > div > main > article > section.css-3kx5e2 > div:nth-child(2) > span.css-47jx3m > span";

const jobDescriptionSelector = "#app > div > main > article > section:nth-child(4)";

const jobRequirementsSelector = "#app > div > main > article > section:nth-child(5)";

let browser;

const loadHtml = async (url) => {
  const pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  const page = await browser.newPage();
  while (true) {
    try {
      await page.goto(url, pageOptions);
    } catch (e) {
      continue;
    }
    break;
  }
  let html = await page.evaluate(() => document.body.innerHTML);
  page.close();
  return parse(html);
};

const scrapeJobPage = async (jobLink) => {
  const jobPage = await loadHtml(`https://wuzzuf.net${jobLink.getAttribute("href")}`);
  const job = {
    job_title: jobLink ? jobLink.innerHTML : "",
    company: jobPage.querySelector(companySelector) ? jobPage.querySelector(companySelector).innerText : "",
    city: jobPage.querySelector(locationSelector) ? jobPage.querySelector(locationSelector).innerText.split(";")[1] : "",
    from: jobPage.querySelector(fromSelector) ? jobPage.querySelector(fromSelector).innerText : "",
    skills: [],
    YearsOfExperience: jobPage.querySelector(experienceSelector) ? jobPage.querySelector(experienceSelector).innerText : "",
    JobDescription: jobPage.querySelector(jobDescriptionSelector) ? jobPage.querySelector(jobDescriptionSelector).textContent : "",
    JobRequirements: jobPage.querySelector(jobRequirementsSelector) ? jobPage.querySelector(jobRequirementsSelector).textContent : "",
    link: `https://wuzzuf.net${jobLink.getAttribute("href")}`.split("?")[0],
  };
  jobPage.querySelectorAll(skillsSelector).forEach((skill, index) => job.skills.push(skill.innerText));
  job.skills = job.skills.join(",");
  return job;
};

const scrape = async (jobTitle) => {
  fs.writeFileSync(`./scraped_data/${jobTitle}.csv`, "");
  csv.stringify(
    [],
    {
      header: true,
      columns: ["job_title", "company", "city", "from", "skills", "YearsOfExperience", "JobDescription", "JobRequirements", "link"],
    },
    (err, output) => fs.appendFileSync(`./scraped_data/${jobTitle}.csv`, output)
  );
  browser = await playwright.chromium.launch();
  //const url = `https://wuzzuf.net/search/jobs/?q=${jobTitle}`;
  const url = `https://wuzzuf.net/search/jobs/?filters%5Bpost_date%5D%5B0%5D=within_24_hours&q=${jobTitle}`;
  let searchPage = await loadHtml(url);
  const jobsNumber = Number(searchPage.querySelector(jobsNumberSelector).innerText.replace(",", ""));
  const NumberOfPages = Math.ceil(jobsNumber / 15);
  console.log(jobTitle, ":", jobsNumber);
  for (let i = 0; i < NumberOfPages; i++) {
    searchPage = await loadHtml(`${url}&start=${i}`);
    const jobsLinks = searchPage.querySelectorAll(jobPostLinkSelector);
    for (const jobLink of jobsLinks) {
      const job = await scrapeJobPage(jobLink);
      csv.stringify([job], (err, output) => fs.appendFileSync(`./scraped_data/${jobTitle}.csv`, output));
    }
  }
  if (browser.isConnected()) {
    await browser.close();
  }
};

(async () => {
  for (const jobTitle of jobTitles) {
    console.log("start:", jobTitle);
    await scrape(jobTitle);
    console.log("end:", jobTitle);
  }
})();
