'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '@/lib/store';
import DocumentCard from '@/components/DocumentCard';
import { useRouter } from 'next/navigation';


const Library = () => {
  const { documents, removeDocument } = useStore();
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/document/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Document Library</h1>
        <button
          onClick={() => router.push('/')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Document
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onSelect={handleSelect}
            onDelete={removeDocument}
          />
        ))}

        {documents.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No documents yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Library
