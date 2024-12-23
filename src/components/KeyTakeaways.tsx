import React from 'react';

interface KeyTakeawaysProps {
  takeaways: string[];
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!Array.isArray(takeaways) || takeaways.length === 0) {
    return <p className="text-gray-500">No key takeaways available.</p>;
  }

  return (
    <ul className="list-disc pl-5">
      {takeaways.map((takeaway, index) => (
        <li key={index} className="mb-2">
          {typeof takeaway === 'string' ? takeaway : 'Invalid takeaway format'}
        </li>
      ))}
    </ul>
  );
}
