import React from 'react';
import { VideoInterval } from '../types';

interface ProgressBarProps {
  duration: number;
  intervals: VideoInterval[];
  currentTime: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  intervals,
  currentTime,
  className = '',
}) => {
  // Calculate segments to display in the progress bar
  const segments = intervals.map((interval) => {
    const startPercent = (interval.start / duration) * 100;
    const endPercent = (interval.end / duration) * 100;
    const width = endPercent - startPercent;
    
    return {
      left: `${startPercent}%`,
      width: `${width}%`,
    };
  });

  // Current playhead position
  const currentPosition = (currentTime / duration) * 100;

  return (
    <div className={`relative h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      {/* Watched segments */}
      {segments.map((segment, index) => (
        <div
          key={index}
          className="absolute h-full bg-blue-500 transition-all duration-300"
          style={{ left: segment.left, width: segment.width }}
        />
      ))}
      
      {/* Playhead */}
      <div
        className="absolute w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/4 transition-all duration-100"
        style={{ left: `${currentPosition}%`, top: '50%' }}
      />
    </div>
  );
};

export default ProgressBar;