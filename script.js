const playwright = require("playwright");

const jobTitles = ["Back-End Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer", "IT Specialist", "Software Engineer", "Database Administrator", "Data Analyst", "Front-End Developer", "Tester", "Network Engineer", "Cyber Security", "Machine Learning Engineer", "Embedded Systems Engineer", "Game Developer", "Data Engineer", "Dev-Ops"];

async function scrape(jobTitle) {
  const browser = await playwright.chromium.launch({});
  const page = await browser.newPage();
  const pageOptions = {
    waitUntil: "load",
    timeout: 0,
  };
  await page.goto(`https://wuzzuf.net/search/jobs/?q=${jobTitle}`, pageOptions);

  const jobsNumber = await page.$eval("#app > div > div.css-1omce3u > div > div > div.css-13hf9up.e1v1l3u10 > div.css-osele2 > span.css-xkh9ud > strong", (el) => el.textContent);
  console.log(jobTitle, " : ", jobsNumber);
  await browser.close();
}
jobTitles.forEach((jobTitle) => {
  scrape(jobTitle);
});
