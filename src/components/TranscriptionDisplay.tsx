import React from 'react';

interface TranscriptionDisplayProps {
  isRecording: boolean;
  transcription: string;
  isProcessing: boolean;
}

export default function TranscriptionDisplay({
  isRecording,
  transcription,
  isProcessing,
}: TranscriptionDisplayProps) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Live Transcription</h2>
      <p className="text-gray-600">
        {isProcessing ? (
          "Processing audio..."
        ) : isRecording ? (
          "Transcribing..."
        ) : transcription ? (
          transcription
        ) : (
          "Start recording to see transcription"
        )}
      </p>
    </div>
  );
}
