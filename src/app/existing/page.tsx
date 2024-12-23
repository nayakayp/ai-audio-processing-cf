'use client'
import { useState, useCallback } from 'react';
import { Volume2 } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { processUploadedDocument } from '@/lib/utils/fileUtils';
import { generateSummary, generateKeyTakeaways, textToSpeech } from '@/lib/openai';
import { useStore } from '@/lib/store';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Existing = () => {
  const [, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const addDocument = useStore((state) => state.addDocument);

  const handleTextToSpeech = async (text: string) => {
    try {
      setIsProcessing(true);
      const audioBlob = await textToSpeech(text);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert text to speech');
    } finally {
      setIsProcessing(false);
    }
  };

  const processDocument = async (text: string, fileName: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: 'Processing document: ' + fileName }]);

      // Generate summary and takeaways
      const summary = await generateSummary(text);
      const takeaways = await generateKeyTakeaways(text);

      // Generate audio
      const audioBlob = await textToSpeech(text);
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioUrl)

      // Create new document
      const newDoc = {
        id: Date.now().toString(),
        name: fileName,
        transcription: text,
        summary,
        keyTakeaways: takeaways,
        audioBlob,
        audioUrl,
        createdAt: new Date(),
      };

      addDocument(newDoc);

      // Add success message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Document processed successfully! You can view it in the library.'
      }]);

      // Set audio URL for playback
      setAudioUrl(audioUrl);

      // Clear input
      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const text = await processUploadedDocument(file);
      await processDocument(text, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Process Existing Document</h1>

        <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${message.role === 'user'
                ? 'bg-blue-100 ml-12'
                : 'bg-gray-100 mr-12'
                }`}
            >
              {message.content}
              {message.role === 'assistant' && (
                <button
                  onClick={() => handleTextToSpeech(message.content)}
                  className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
                  disabled={isProcessing}
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  Listen
                </button>
              )}
            </div>
          ))}
        </div>

        {audioUrl && (
          <div className="mb-6">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default Existing
