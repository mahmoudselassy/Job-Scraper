import { JobPage } from "./JobPage";
import { SearchPage } from "./SearchPage";
const fs = require("fs");
const csv = require("csv-stringify");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Software Tester", "Network Engineer", "Cyber Security Engineer", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "DevOps Engineer"];

const jobsNumberSelector = "#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong";

const jobPostLinkSelector = "#app > div > div.css-1omce3u > div > div > div:nth-child(2) > div > div > div.css-laomuu > h2 > a";

const jobPageSelectors = new Map([
  ["#app > div > main > article > section.css-dy1y6u > div > h1", "Title"],
  ["#app > div > main > article > section.css-dy1y6u > div > strong > div > a", "Company"],
  ["#app > div > main > article > section.css-dy1y6u > div > strong", "City"],
  ["#app > div > main > article > section.css-dy1y6u > div > span", "Date"],
  ["#app > div > main > article > section.css-3kx5e2 > div:nth-child(2) > span.css-47jx3m > span", "Experience"],
  ["#app > div > main > article > section:nth-child(4)", "JobDescription"],
  ["#app > div > main > article > section:nth-child(5)", "JobRequirements"],
]);

//const url = `https://wuzzuf.net/search/jobs/?q=${jobTitle}`;
//const url = `https://wuzzuf.net/search/jobs/?filters%5Bpost_date%5D%5B0%5D=within_24_hours&q=${jobTitle}`;
/*
const scrape = async (jobTitle: string) => {
  const url = `https://wuzzuf.net/search/jobs/?filters%5Bpost_date%5D%5B0%5D=within_24_hours&q=${jobTitle}`;
  let searchPage = new SearchPage(url, jobsNumberSelector, jobPostLinkSelector);
  const jobsNumber = await searchPage.scrapeJobsNumber();
  const jobsPerPage = 15;
  const NumberOfPages = Math.ceil(jobsNumber / jobsPerPage);
  for (let i = 0; i < NumberOfPages; i++) {
    searchPage = new SearchPage(`https://wuzzuf.net/search/jobs/?filters%5Bpost_date%5D%5B0%5D=within_24_hours&q=${jobTitle}&start=${i}`, jobsNumberSelector, jobPostLinkSelector);
    const jobsLinks = await searchPage.scrapeJobsLinks();
    for (const jobLink of jobsLinks) {
      const jobPage = new JobPage(jobLink, jobPageSelectors);
      console.log(await jobPage.scrape());
    }
  }
};

(async () => {
  for (const jobTitle of jobTitles) {
    console.log("start:", jobTitle);
    await scrape(jobTitle);
    console.log("end:", jobTitle);
  }
})();*/
/*
  fs.writeFileSync(`./scraped_data/${jobTitle}.csv`, "");
  csv.stringify(
    [],
    {
      header: true,
      columns: ["Title", "Company", "City", "Date", "Experience", "JobDescription", "JobRequirements", "Url"],
    },
    (er: any, output: any) => fs.appendFileSync(`./scraped_data/${jobTitle}.csv`, output)
  );
        csv.stringify([job], (err, output) => fs.appendFileSync(`./scraped_data/${jobTitle}.csv`, output));

  */
