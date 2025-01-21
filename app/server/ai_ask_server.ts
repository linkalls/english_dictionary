"use server"
import { askAi } from "./../utils/ask_ai";

export const askAiAction = async (formData: FormData) => {
  const query = formData.get("search") as string;
  const result = await askAi("you are a english teacher for Japanese.Please always response in japoanese and please tell me what this word means in japanese."+query);
  console.log(result);
  return result;
};
