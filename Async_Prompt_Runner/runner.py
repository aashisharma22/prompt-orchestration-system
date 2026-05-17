import asyncio
import aiohttp
import json
import time

limit = 5


async def process(session, semaphore, endpoint, prompt, blocklist):
    async with semaphore:
        start = time.perf_counter()
        try:
            async with session.post(endpoint, json={"prompt": prompt}) as resp:
                data = await resp.json()

                latency = (time.perf_counter() - start) * 1000

                response_text = data.get("json", {}).get("prompt", "").lower()

                status = "pass"
                for word in blocklist:
                    if word.lower() in response_text:
                        status = "fail"
                        break

                return {
                    "prompt": prompt,
                    "response": data,
                    "status": status,
                    "latency_ms": round(latency, 2)
                }

        except Exception as e:
            latency = (time.perf_counter() - start) * 1000
            print(f"Error for prompt '{prompt}': {e}")

            return {
                "prompt": prompt,
                "response": str(e),
                "status": "fail",
                "latency_ms": round(latency, 2)
            }


async def main():
    with open("prompts.json", "r") as f:
        config = json.load(f)

    endpoint = config["endpoint"]
    prompts = config["prompts"]
    blocklist = config["blocklist"]

    semaphore = asyncio.Semaphore(limit)

    async with aiohttp.ClientSession() as session:
        tasks = [
            process(session, semaphore, endpoint, prompt, blocklist)
            for prompt in prompts
        ]

        results = await asyncio.gather(*tasks)

    with open("results.json", "w") as f:
        json.dump(results, f, indent=2)

    total = len(results)
    passed = sum(1 for r in results if r["status"] == "pass")
    failed = total - passed
    avg_latency = sum(r["latency_ms"] for r in results) / total if total else 0

    print("\nSummary:")
    print(f"Total: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Average Latency: {round(avg_latency, 2)} ms")


if __name__ == "__main__":
    asyncio.run(main())