import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge'

export async function POST(request: Request) {
  const formData = await request.formData();
  const c = getRequestContext()

  try {
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to get answer');
    }

    const data = await response.json() as { text: string };

    return Response.json(data);
  } catch (error) {
    return Response.json(error);
  }
}
