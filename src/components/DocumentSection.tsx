'use client'
import { useState } from 'react';
import { askQuestion } from '@/lib/openai';
import { ChevronDown, ChevronUp, MessageSquare, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import KeyTakeaways from '@/components/KeyTakeaways';


const DocumentSection = ({ pageId }: { pageId: string }) => {
  const router = useRouter();
  const document = useStore((state) =>
    state.documents.find(doc => doc.id === pageId)
  );
  const [activeSection, setActiveSection] = useState<string | null>('transcription');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Document not found</div>
      </div>
    );
  }

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await askQuestion(document, question);
      setAnswer(response);
      setQuestion('');
    } catch (error) {
      console.error('Failed to get answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    {
      id: 'recording',
      title: 'Recording',
      content: document.audioUrl && document.audioBlob && (
        <div className="w-full">
          <audio controls className="w-full">
            <source src={URL.createObjectURL(document.audioBlob)} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ),
    },
    {
      id: 'transcription',
      title: 'Transcription',
      content: document.transcription,
    },
    {
      id: 'summary',
      title: 'Summary',
      content: document.summary,
    },
    {
      id: 'takeaways',
      title: 'Key Takeaways',
      content: <KeyTakeaways takeaways={document.keyTakeaways || []} />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.push('/library')}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </button>

      <h1 className="text-2xl font-bold mb-6">{document.name}</h1>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center"
              onClick={() => setActiveSection(
                activeSection === section.id ? null : section.id
              )}
            >
              <span className="font-semibold">{section.title}</span>
              {activeSection === section.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {activeSection === section.id && (
              <div className="p-4">{section.content}</div>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Ask Questions</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about the document..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAskQuestion}
              disabled={isLoading || !question.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Ask
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-gray-600">Getting answer...</div>
          )}

          {answer && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-gray-800">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentSection
