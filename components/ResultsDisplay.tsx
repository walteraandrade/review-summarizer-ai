
import React from 'react';
import SourceList from './SourceList';
import TechnicalDetails from './TechnicalDetails';
import InfluenceMap from './InfluenceMap';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult & { query: string };
  onInfluenceClick: (topic: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onInfluenceClick }) => {
  const { summary, sources, type, details, influenceMap, query } = result;

  const formattedSummary = summary.split('\n').filter(p => p.trim() !== '').map((p, i) => (
    <p key={i} className="mb-4 last:mb-0">{p}</p>
  ));

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Summary</h2>
        <div className="prose prose-invert prose-xl max-w-none text-foreground">
          {formattedSummary}
        </div>
      </div>

      {influenceMap && (
        <InfluenceMap topic={query} data={influenceMap} onInfluenceClick={onInfluenceClick} />
      )}

      {details && Object.keys(details).length > 0 && (
        <TechnicalDetails details={details} type={type} />
      )}

      {sources.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-3">Sources</h3>
          <SourceList sources={sources} />
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
