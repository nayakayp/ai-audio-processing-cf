import { TOpenAIChatCompletions } from "@/types/TOpenAI";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge'

export async function POST(request: Request) {
  const body = await request.json();
  const c = getRequestContext()

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to get answer');
    }

    const data = await response.json() as TOpenAIChatCompletions;

    return Response.json(data);
  } catch (error) {
    return Response.json(error);
  }
}
