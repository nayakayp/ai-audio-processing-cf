import { useState } from 'react';
import { transcribeAudio, generateSummary, generateKeyTakeaways } from '../lib/openai';
import { useStore } from '../lib/store';

export default function useProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addDocument = useStore((state) => state.addDocument);

  const processAudio = async (audioBlob: Blob, name: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Transcribe audio
      const transcription = await transcribeAudio(audioBlob);

      // Step 2: Generate summary
      const summary = await generateSummary(transcription);

      // Step 3: Generate key takeaways
      const keyTakeaways = await generateKeyTakeaways(transcription);

      // Step 4: Create document
      const audioUrl = URL.createObjectURL(audioBlob);
      const newDoc = {
        id: Date.now().toString(),
        name: name || 'Untitled Document',
        audioUrl,
        audioBlob,
        transcription,
        summary,
        keyTakeaways,
        createdAt: new Date(),
      };

      addDocument(newDoc);
      return newDoc;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processAudio,
    isProcessing,
    error,
  };
}
