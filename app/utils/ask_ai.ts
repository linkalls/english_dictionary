import { initChat } from "@mumulhl/duckduckgo-ai-chat";

// Initialize, optional models are gpt-4o-mini, claude-3-haiku-20240307, meta-llama/Llama-3-70b-chat-hf, mistralai/Mixtral-8x7B-Instruct-v0.1
const chat = await initChat("gpt-4o-mini");

export const askAi = async (query: string) => {
  // Fetch the full reply in one go
  const message = await chat.fetchFull(query);
  return message;
};

// // Fetch the full reply in one go
// let message = await chat.fetchFull("Hello");
// console.log(message)

// // Redo
// chat.redo()
// message = await chat.fetchFull("Hello");
// console.log(message)

// // Fetch the streamed reply
// const stream = chat.fetchStream("Hello");
// for await (const data of stream) {
//   console.log(data)
// }
