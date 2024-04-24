export * from "./facebookAgent";
export * from "./twitterAgent";

export type Agent = "facebook" | "twitter";

import type { CreateChatCompletionRequest } from "openai";
export default function createAgent(
  agent: (context: Record<string, any>) => Partial<CreateChatCompletionRequest>
) {
  return agent;
}
