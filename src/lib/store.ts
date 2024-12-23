import { create } from 'zustand';
import { openDB } from 'idb';

export interface Document {
  id: string;
  name: string;
  audioUrl?: string;
  audioBlob?: Blob;
  transcription?: string;
  summary?: string;
  keyTakeaways?: string[];
  createdAt: Date;
}

interface AppState {
  documents: Document[];
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  currentDocument: Document | null;
  setCurrentDocument: (doc: Document | null) => void;
}

// Initialize IndexedDB
const initDB = async () => {
  return openDB('AudioDocumentsDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('documents')) {
        db.createObjectStore('documents', { keyPath: 'id' });
      }
    },
  });
};

// Save document to IndexedDB
const saveDocumentToDB = async (doc: Document) => {
  const db = await initDB();
  await db.put('documents', doc);
};

// Load documents from IndexedDB
const loadDocumentsFromDB = async () => {
  const db = await initDB();
  return await db.getAll('documents');
};

export async function deleteDocument(id: string): Promise<void> {
  const db = await openDB('AudioDocumentsDB', 1);
  await db.delete('documents', id);
}

export const useStore = create<AppState>((set) => ({
  documents: [],
  currentDocument: null,
  addDocument: (doc) => {
    set((state) => ({ documents: [...state.documents, doc] }));
    saveDocumentToDB(doc).catch(console.error);
  },
  removeDocument: async (id) => {
    await deleteDocument(id);
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
      currentDocument: state.currentDocument?.id === id ? null : state.currentDocument,
    }));
  },
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
}));

// Load documents on app initialization
(async () => {
  const savedDocuments = await loadDocumentsFromDB();
  useStore.setState({ documents: savedDocuments });
})();
