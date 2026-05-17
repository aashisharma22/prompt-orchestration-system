import axios from "axios";
import { Provider } from "./interface";

export class ProviderB implements Provider {
  async call(prompt: string): Promise<{ output: string; tokens: number }> {
    const res = await axios.post("https://httpbin.org/post", {
      prompt: prompt,
    });

    const response = res.data?.json?.prompt || "";

    const providerBResponse = {
      output: response,
      meta: {
        tokens: response.split(" ").length,
      },
    };

    return {
      output: providerBResponse.output,
      tokens: providerBResponse.meta.tokens,
    };
  }
}