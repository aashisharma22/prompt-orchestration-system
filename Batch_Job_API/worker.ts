import axios from "axios";
import { getAllJobs } from "./jobqueue";
import { Job } from "./interfaces";

async function processJobs() {
  const jobs = getAllJobs();

  for (const jobId in jobs) {
    const job: Job = jobs[jobId];

    if (job.status !== "queued") continue;

    job.status = "processing";

    for (const prompt of job.prompts) {
      try {
        const res = await axios.post("https://httpbin.org/post", {
          prompt: prompt,
        });

        if (res.status === 200) {
          job.results.push({ prompt, status: "pass" });
          job.passed += 1;
        } else {
          job.results.push({ prompt, status: "fail" });
          job.failed += 1;
        }
      } catch (err) {
        job.results.push({ prompt, status: "fail" });
        job.failed += 1;
      }
    }

    job.status = "done";
  }
}

export function startWorker() {
  setInterval(() => {
    processJobs();
  }, 1000);
}