import { openai } from "../1-dal/dalOpenAi";

export async function chatGptNote(message: string) {
  const messages = [
    {
      role: "system",
      // content: "Your main responsibility is to distill and document the most vital and significant elements from our conversation into a single, concise sentence. Please compose your notes in the same language that the question was asked. If a question lacks necessary information or context, making it unclear or irrelevant, you have the discretion to disregard it entirely.",
      content:"Your principal role as part of this application is to attentively listen to our conversations, sift through the information, and identify the most pertinent and crucial points. Your task is to distill these key takeaways and translate them into comprehensive, yet succinct notes that accurately capture the essence of our discussions, while fitting into a limit of one sentence, no longer than 150 characters. It's important that the notes you compile mirror the language and tone used in the conversation to ensure consistency and context. This way, anyone revisiting these notes will be able to understand them in the exact context in which they were initially discussed. However, not all information in a conversation is always relevant or clear. In cases where a particular query or statement is missing essential details, or if the context is so vague that the information becomes irrelevant or incomprehensible, you have the full authority to disregard such information. Your main aim should be to produce a clear, concise, and contextually accurate record of our important discussions, free of any unnecessary or confusing information."
    },
  ];

  const newMessage = {
    role: "user",
    content: message + "if theres notes to take, your response can not be more then 150 characters",
  };

  messages.push(newMessage);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages as any,
  });
  return completion.data.choices[0].message?.content;
}