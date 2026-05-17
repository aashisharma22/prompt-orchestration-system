# prompt-orchestration-system

A backend systems project showcasing asynchronous processing, provider adapters, batch job orchestration, and YAML validation using Python and TypeScript. The repository demonstrates scalable backend engineering concepts including concurrency control, background workers, queue processing, strict typing, modular architecture, and resilient error handling.

---

# Tech Stack

## Languages
- Python 3
- TypeScript
- Node.js

## Frameworks & Libraries
- Express.js
- asyncio
- aiohttp
- uuid
- PyYAML

---

# Async Prompt Runner

## Overview

This module reads prompts from a JSON configuration file and processes them asynchronously using Python’s `asyncio` and `aiohttp`. Requests are executed concurrently with a maximum concurrency limit of five. Each response is validated against a configurable blocklist and execution statistics are stored in a structured output file.

## Features

- Concurrent async HTTP requests
- Semaphore-based concurrency limiting
- Latency measurement for each request
- Configurable blocklist validation
- Structured JSON result generation
- Graceful failure handling and logging
- Execution summary reporting

## Input Format

`prompts.json`

```json
{
  "endpoint": "https://httpbin.org/post",
  "blocklist": ["error", "fail", "invalid"],
  "prompts": [
    "explain what machine learning is",
    "describe how a REST API works"
  ]
}
```

## Output Format

`results.json`

```json
[
  {
    "prompt": "describe how a REST API works",
    "response": "sample response",
    "status": "pass",
    "latency_ms": 210
  }
]
```

## Run

```bash
pip install -r requirements.txt
python async_prompt_runner.py
```

---

# Provider Adapter

## Overview

This module demonstrates the adapter design pattern using TypeScript. Two providers with different response structures are implemented independently and normalized through adapters into a single unified interface.

## Features

- Separate provider implementations
- Unified adapter abstraction
- Strict TypeScript typing
- Reusable provider workflow
- Extensible provider architecture
- No conditional provider handling

## Provider Formats

### Provider A

```json
{
  "choices": [
    {
      "message": {
        "content": "response text"
      }
    }
  ],
  "usage": {
    "total_tokens": 100
  }
}
```

### Provider B

```json
{
  "output": "response text",
  "meta": {
    "tokens": 100
  }
}
```

## Unified Adapter Output

```json
{
  "output": "response text",
  "tokens": 100
}
```

## Run

```bash
npm install
npm run build
npm start
```

---

# Batch Job API

## Overview

This service implements an Express-based batch processing API with asynchronous background workers and in-memory queue management. Jobs are processed independently while exposing real-time status tracking through REST endpoints.

## Features

- RESTful batch processing API
- Background worker architecture
- In-memory job queue
- UUID-based job tracking
- Pass/fail result aggregation
- Proper HTTP status handling
- Strict TypeScript support
- Modular project structure

---

## API Endpoints

### Create Batch Job

```http
POST /batch
```

### Request Body

```json
{
  "prompts": [
    "prompt1",
    "prompt2"
  ],
  "model": "model-a"
}
```

### Success Response

```json
{
  "jobId": "uuid",
  "status": "queued"
}
```

### Validation Error Response

```json
{
  "message": "prompts and model are required"
}
```

---

### Get Batch Status

```http
GET /batch/:jobId
```

### Response

```json
{
  "jobId": "uuid",
  "status": "done",
  "total": 2,
  "passed": 2,
  "failed": 0,
  "results": [
    {
      "prompt": "prompt1",
      "status": "pass"
    }
  ]
}
```

### Not Found Response

```json
{
  "message": "job not found"
}
```

---

## Run

```bash
npm install
npm run dev
```

---

# Config Parser and Validator

## Overview

This module validates and transforms YAML-based test configurations into structured grouped JSON output. Invalid entries are skipped with detailed logging while valid entries are grouped by category.

## Features

- YAML parsing and validation
- Required field enforcement
- Empty prompt validation
- Invalid entry logging
- Category-based grouping
- Structured JSON transformation
- Execution summary statistics

## Input Format

`tests.yaml`

```yaml
tests:
  - prompt: "what is a webhook"
    expected_behavior: "should explain with an example"
    category: "integration"
```

## Output Format

`parsed_tests.json`

```json
{
  "integration": [
    {
      "prompt": "what is a webhook",
      "expected_behavior": "should explain with an example"
    }
  ]
}
```

## Run

```bash
pip install -r requirements.txt
python config_parser.py
```

---

# Engineering Highlights

- Asynchronous concurrent processing
- Adapter design pattern implementation
- Queue-driven job orchestration
- Background worker architecture
- Fault-tolerant execution flow
- Strict TypeScript interfaces
- Modular backend organization
- Structured validation pipelines
- Production-style API design
- Clean separation of concerns

---

# Live Test Endpoint

All network requests use the following endpoint:

```text
https://httpbin.org/post
```

---

# Notes

Additional implementation details, assumptions, design choices, and approach summaries are included in `notes.txt`.
