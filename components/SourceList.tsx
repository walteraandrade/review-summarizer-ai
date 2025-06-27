
import React from 'react';
import type { Source } from '../types';
import LinkIcon from './icons/LinkIcon';

interface SourceListProps {
  sources: Source[];
}

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  return (
    <ul className="space-y-2">
      {sources.map((source, index) => (
        <li key={index}>
          <a
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/60 hover:bg-accent transition-colors duration-200 group overflow-hidden"
          >
            <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-lg font-medium text-foreground group-hover:underline truncate">
              {source.title}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SourceList;