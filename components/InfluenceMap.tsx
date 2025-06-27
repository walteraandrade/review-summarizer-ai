
import React from 'react';
import type { InfluenceMapData, Influence } from '../types';
import GitBranchIcon from './icons/GitBranchIcon';
import ArrowDownLeftIcon from './icons/ArrowDownLeftIcon';
import ArrowUpRightIcon from './icons/ArrowUpRightIcon';

interface InfluenceMapProps {
  topic: string;
  data: InfluenceMapData;
  onInfluenceClick: (topic: string) => void;
}

interface InfluenceCardProps {
  influence: Influence;
  onClick: () => void;
}

const InfluenceCard: React.FC<InfluenceCardProps> = ({ influence, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left bg-muted/60 p-3 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
  >
    <p className="font-semibold text-foreground">{influence.name}</p>
    {influence.description && (
      <p className="text-sm text-muted-foreground mt-1">{influence.description}</p>
    )}
  </button>
);

const InfluenceMap: React.FC<InfluenceMapProps> = ({ topic, data, onInfluenceClick }) => {
  const { influencedBy, hasInfluenced } = data;

  if (!influencedBy?.length && !hasInfluenced?.length) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <GitBranchIcon className="w-6 h-6 text-muted-foreground" />
        <h3 className="text-2xl font-semibold text-foreground">Influence Map</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-4 items-center">
        {/* Influenced By Column */}
        <div className="lg:pr-8">
          <div className="flex items-center gap-2 mb-3 text-lg font-medium text-muted-foreground">
            <ArrowDownLeftIcon className="w-5 h-5" />
            <span>Influenced By</span>
          </div>
          <div className="space-y-3">
            {influencedBy?.length ? influencedBy.map((item, i) => <InfluenceCard key={`by-${i}`} influence={item} onClick={() => onInfluenceClick(item.name)} />) : <p className="text-muted-foreground italic">No influences found.</p>}
          </div>
        </div>

        {/* Center Column (Connector and Topic) */}
        <div className="flex flex-col items-center my-4 lg:my-0">
            {/* Vertical connector for mobile */}
            <div className="w-px h-8 bg-border lg:hidden"></div>
            <div className="relative flex items-center justify-center w-full">
                {/* Horizontal connector for desktop */}
                <div className="hidden lg:block absolute left-0 w-full h-px bg-border"></div>
                <div className="relative bg-primary text-primary-foreground text-center font-bold text-lg p-3 rounded-lg z-10 w-48 truncate shadow-lg">
                    {topic}
                </div>
            </div>
            {/* Vertical connector for mobile */}
            <div className="w-px h-8 bg-border lg:hidden"></div>
        </div>

        {/* Has Influenced Column */}
        <div className="lg:pl-8">
          <div className="flex items-center gap-2 mb-3 text-lg font-medium text-muted-foreground">
            <ArrowUpRightIcon className="w-5 h-5" />
            <span>Has Influenced</span>
          </div>
          <div className="space-y-3">
            {hasInfluenced?.length ? hasInfluenced.map((item, i) => <InfluenceCard key={`has-${i}`} influence={item} onClick={() => onInfluenceClick(item.name)} />) : <p className="text-muted-foreground italic">No known influences.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluenceMap;
