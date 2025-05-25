import React from 'react';
import { Lecture } from '../types';
import { getVideoProgress } from '../services/storageService';
import { Play } from 'lucide-react';

interface LectureCardProps {
  lecture: Lecture;
  onClick: (lecture: Lecture) => void;
}

const LectureCard: React.FC<LectureCardProps> = ({ lecture, onClick }) => {
  const progress = getVideoProgress(lecture.id);
  const percentage = progress?.percentage || 0;
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={() => onClick(lecture)}
    >
      <div className="relative">
        <img 
          src={lecture.thumbnailUrl} 
          alt={lecture.title} 
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full">
            <Play className="text-white" size={32} />
          </div>
        </div>
        {percentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{lecture.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lecture.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{formatDuration(lecture.duration)}</span>
          {percentage > 0 && (
            <span className="text-sm font-medium text-blue-600">{percentage}% completed</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format duration in HH:MM:SS
const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default LectureCard;