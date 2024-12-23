'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AudioRecorder } from '@/lib/audio';
import useProcessing from '@/hooks/useProcessing';
import RecordingControls from '@/components/RecordingControls';
import TranscriptionDisplay from '@/components/TranscriptionDisplay';

const audioRecorder = new AudioRecorder();

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscription, setShowTranscription] = useState(true);
  const [documentName, setDocumentName] = useState('');
  const [transcription, setTranscription] = useState('');
  const { processAudio, isProcessing, error } = useProcessing();
  const router = useRouter();

  const handleStartRecording = async () => {
    try {
      await audioRecorder.startRecording();
      setIsRecording(true);
      setTranscription('');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const audioBlob = await audioRecorder.stopRecording();
      setIsRecording(false);

      const doc = await processAudio(audioBlob, documentName);
      if (doc) {
        router.push('/library');
      }
    } catch (error) {
      console.error('Failed to process recording:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">New Document</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Document Name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <RecordingControls
          isRecording={isRecording}
          showTranscription={showTranscription}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onToggleTranscription={() => setShowTranscription(!showTranscription)}
          isProcessing={isProcessing}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {showTranscription && (
          <TranscriptionDisplay
            isRecording={isRecording}
            transcription={transcription}
            isProcessing={isProcessing}
          />
        )}
      </div>
    </div>
  );
}
