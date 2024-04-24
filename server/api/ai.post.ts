import { Configuration, OpenAIApi } from "openai";
import * as agents from "@/agents"

const { OPENAI_API_KEY } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const agent = body.agent || 'twitter';

  if (!Object.keys(agents).includes(agent)){
    throw new Error(`${agent} doesn't exists!`)
  }

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: body.messages || [],
    temperature: body.temperature || 1,
    // @ts-expect-error
    ...agents[agent](body),
  });

  return completion.data;
});
