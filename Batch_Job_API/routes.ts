import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { addJob, getJob } from "./jobqueue";
import { Job } from "./interfaces";

const router = express.Router();

router.post("/batch", (req: Request, res: Response) => {
  const { prompts, model } = req.body;

  if (!prompts || !model) {
    return res.status(400).json({
      message: "prompts and model are required",
    });
  }

  if (!Array.isArray(prompts)) {
    return res.status(400).json({
      message: "prompts must be an array",
    });
  }

  const jobId = uuidv4();

  const job: Job = {
    jobId: jobId,
    status: "queued",
    prompts: prompts,
    results: [],
    total: prompts.length,
    passed: 0,
    failed: 0,
  };

  addJob(job);

  return res.status(200).json({
    jobId: jobId,
    status: "queued",
  });
});

router.get("/batch/:jobId", (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  
  const job = getJob(jobId);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  return res.status(200).json({
    jobId: job.jobId,
    status: job.status,
    total: job.total,
    passed: job.passed,
    failed: job.failed,
    results: job.results,
  });
});

export default router;