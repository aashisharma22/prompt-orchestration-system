export type Status = "queued" | "processing" | "done";

export interface Result {
  prompt: string;
  status: "pass" | "fail";
}

export interface Job {
  jobId: string;
  status: Status;
  prompts: string[];
  results: Result[];
  total: number;
  passed: number;
  failed: number;
}