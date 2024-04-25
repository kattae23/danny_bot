import { promps } from 'src/utils/constants';
import { JsonResponse } from 'types';

const url = process.env.CHAT_GPT_URL;

export const fetchingData = async (message: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      system_prompt: promps.DANNY_TEXTER,
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  });
  const { result }: JsonResponse = await response.json();

  return result;
};
