import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { validateFile } from '@/lib/utils/fileUtils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export default function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed rounded-lg p-8 text-center"
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">
        Drop your document here or{' '}
        <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
          browse
          <input
            type="file"
            className="hidden"
            accept=".txt,.doc,.docx"
            onChange={handleFileInput}
            disabled={isProcessing}
          />
        </label>
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports TXT, DOC, DOCX
      </p>
    </div>
  );
}
