import { Document } from '@/lib/store';
import { TOpenAIChatCompletions } from '@/types/TOpenAI';

export async function askQuestion(document: Document, question: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that answers questions about documents.',
        },
        {
          role: 'user',
          content: `Here is the document content: ${document.transcription}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get answer');
  }

  const data = await response.json() as TOpenAIChatCompletions;
  return data.choices[0].message.content;
}

export async function textToSpeech(text: string): Promise<Blob> {
  const response = await fetch('/api/tts', {
    method: 'POST',
    body: JSON.stringify({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error('Text-to-speech conversion failed');
  }

  return await response.blob();
}

export async function generateSummary(text: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates concise summaries.',
        },
        {
          role: 'user',
          content: `Please provide a clear and concise summary of the following text: ${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get answer');
  }

  const data = await response.json() as TOpenAIChatCompletions;
  return data.choices[0].message.content;
}

export async function generateKeyTakeaways(text: string): Promise<string[]> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that extracts key takeaways from text. Return exactly 3-5 takeaways as a JSON array of strings.',
        },
        {
          role: 'user',
          content: `Extract 3-5 key takeaways from the following text and return them as a JSON array of strings: ${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Key takeaways generation failed');
  }

  const data = await response.json() as TOpenAIChatCompletions;
  const content = data.choices[0].message.content

  try {
    // Try to parse as JSON array
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
          // Handle object format by extracting text content
          return String(
            item.key_takeaway ||
            item.takeaway ||
            item.text ||
            item.content ||
            JSON.stringify(item)
          );
        }
        return String(item);
      });
    }
  } catch (error) {
    // Fallback: Split by newlines and clean up
    console.warn('Failed to parse takeaways as JSON, falling back to text parsing: ', error);
  }

  // Fallback: Parse as text
  return content
    .split('\n')
    .filter((line: string) => line.trim())
    .map((line: string) => line.replace(/^[-*\d.]+\s*/, '').trim())
    .filter((line: string) => line.length > 0)
    .slice(0, 5); // Limit to 5 takeaways
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Transcription failed');
  }

  const data = await response.json() as { text: string }
  return data.text;
}

