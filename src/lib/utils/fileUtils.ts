export const processUploadedDocument = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (file.type === 'application/pdf') {
      // For PDF files, we'd need a PDF parser library
      reject(new Error('PDF parsing not implemented yet'));
    } else {
      reader.readAsText(file);
    }
  });
};

export const validateFile = (file: File): boolean => {
  const allowedTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  return allowedTypes.includes(file.type);
};
