import { Provider } from "./interface";
import { ProviderA } from "./providerA";
import { ProviderB } from "./providerB";
import * as fs from "fs";

async function runPrompt(provider: Provider, prompt: string) {
  const result = await provider.call(prompt);

  console.log("Prompt:", prompt);
  console.log("Output:", result.output);
  console.log("Tokens:", result.tokens);
  console.log("-------------");
}

async function main() {
  const file_prompts = fs.readFileSync("../task1/prompts.json", "utf-8");
  const config = JSON.parse(file_prompts);

  const prompts: string[] = config.prompts;

  const providerA = new ProviderA();
  const providerB = new ProviderB();

  for (const prompt of prompts) {
    console.log("=== Provider A ===");
    await runPrompt(providerA, prompt);

    console.log("=== Provider B ===");
    await runPrompt(providerB, prompt);
  }
}

main();