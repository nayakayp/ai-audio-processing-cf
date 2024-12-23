import React from 'react';
import { Mic, StopCircle, Eye, EyeOff } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  showTranscription: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onToggleTranscription: () => void;
  isProcessing: boolean;
}

export default function RecordingControls({
  isRecording,
  showTranscription,
  onStartRecording,
  onStopRecording,
  onToggleTranscription,
  isProcessing,
}: RecordingControlsProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        disabled={isProcessing}
        className={`flex items-center px-4 py-2 rounded ${isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isRecording ? (
          <>
            <StopCircle className="w-5 h-5 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            Start Recording
          </>
        )}
      </button>

      <button
        onClick={onToggleTranscription}
        className="flex items-center px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        {showTranscription ? (
          <>
            <EyeOff className="w-5 h-5 mr-2" />
            Hide Transcription
          </>
        ) : (
          <>
            <Eye className="w-5 h-5 mr-2" />
            Show Transcription
          </>
        )}
      </button>
    </div>
  );
}
