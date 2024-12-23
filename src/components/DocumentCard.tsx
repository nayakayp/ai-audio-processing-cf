import { FileText, Trash2 } from 'lucide-react';
import { Document } from '@/lib/store';

interface DocumentCardProps {
  document: Document;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DocumentCard({ document, onSelect, onDelete }: DocumentCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this document?')) {
      onDelete(document.id);
    }
  };

  return (
    <div
      onClick={() => onSelect(document.id)}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="font-semibold">{document.name}</h3>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
          title="Delete document"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-gray-500">
        {new Date(document.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
