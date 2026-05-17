import axios from "axios";
import { Provider } from "./interface";

export class ProviderA implements Provider {
  async call(prompt: string): Promise<{ output: string; tokens: number }> {
    const res = await axios.post("https://httpbin.org/post", {
      prompt: prompt,
    });

    const response = res.data?.json?.prompt || "";

    const providerAResponse = {
      choices: [
        {
          message: {
            content: response,
          },
        },
      ],
      usage: {
        total_tokens: Math.ceil(response.length / 4),
      },
    };

    return {
      output: providerAResponse.choices[0].message.content,
      tokens: providerAResponse.usage.total_tokens,
    };
  }
}