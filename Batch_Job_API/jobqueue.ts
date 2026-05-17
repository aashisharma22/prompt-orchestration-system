import { Job } from "./interfaces";

const jobs: Record<string, Job> = {};

export function addJob(job: Job) {
  jobs[job.jobId] = job;
}

export function getJob(jobId: string): Job | undefined {
  return jobs[jobId];
}

export function getAllJobs(): Record<string, Job> {
  return jobs;
}