import React, { useRef, useState, useEffect } from 'react';
import { VideoInterval, VideoProgress } from '../types';
import { 
  mergeIntervals, 
  calculateTotalWatched, 
  calculatePercentage, 
  addInterval 
} from '../utils/intervalUtils';
import { 
  getVideoProgress, 
  saveVideoProgress 
} from '../services/storageService';
import ProgressBar from './ProgressBar';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
  title: string;
  duration: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId, 
  videoUrl, 
  title,
  duration
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState<VideoProgress>({
    videoId,
    intervals: [],
    lastPosition: 0,
    totalWatched: 0,
    percentage: 0
  });

  // Track start time of current viewing segment
  const [currentSegmentStart, setCurrentSegmentStart] = useState<number | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = getVideoProgress(videoId);
    if (savedProgress) {
      setProgress(savedProgress);
      
      // Resume from last position
      if (videoRef.current && savedProgress.lastPosition > 0) {
        videoRef.current.currentTime = savedProgress.lastPosition;
      }
    }
  }, [videoId]);

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle play state change
  const handlePlayStateChange = () => {
    const isVideoPlaying = !videoRef.current?.paused;
    setIsPlaying(isVideoPlaying);
    
    // Start tracking segment when playing begins
    if (isVideoPlaying && currentSegmentStart === null) {
      setCurrentSegmentStart(videoRef.current?.currentTime || 0);
    } 
    // End segment tracking when paused
    else if (!isVideoPlaying && currentSegmentStart !== null) {
      const newInterval: VideoInterval = {
        start: currentSegmentStart,
        end: videoRef.current?.currentTime || currentSegmentStart
      };
      
      // Only add valid intervals
      if (newInterval.end > newInterval.start) {
        updateProgress(newInterval);
      }
      
      setCurrentSegmentStart(null);
    }
  };

  // Update progress with new interval
  const updateProgress = (newInterval: VideoInterval) => {
    setProgress(prevProgress => {
      // Add new interval
      const updatedIntervals = addInterval(prevProgress.intervals, newInterval);
      
      // Merge intervals and calculate new stats
      const mergedIntervals = mergeIntervals(updatedIntervals);
      const totalWatched = calculateTotalWatched(mergedIntervals);
      const percentage = calculatePercentage(totalWatched, duration);
      
      const updatedProgress: VideoProgress = {
        ...prevProgress,
        intervals: mergedIntervals,
        lastPosition: newInterval.end,
        totalWatched,
        percentage
      };
      
      // Save to storage
      saveVideoProgress(updatedProgress);
      
      return updatedProgress;
    });
  };

  // Handle seeking
  const handleSeeking = () => {
    if (currentSegmentStart !== null && videoRef.current) {
      // End previous segment and start a new one
      const newInterval: VideoInterval = {
        start: currentSegmentStart,
        end: videoRef.current.currentTime
      };
      
      // Only add valid intervals (end > start)
      if (newInterval.end > newInterval.start) {
        updateProgress(newInterval);
      }
      
      // Start a new segment from the seek position
      setCurrentSegmentStart(videoRef.current.currentTime);
    }
  };

  // Update current time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Save last position before user leaves
  useEffect(() => {
    const saveBeforeUnload = () => {
      if (videoRef.current && progress) {
        const updatedProgress = {
          ...progress,
          lastPosition: videoRef.current.currentTime
        };
        saveVideoProgress(updatedProgress);
      }
    };

    window.addEventListener('beforeunload', saveBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', saveBeforeUnload);
      
      // Also save on unmount
      saveBeforeUnload();
    };
  }, [progress]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {/* Video element */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video bg-black"
          onPlay={handlePlayStateChange}
          onPause={handlePlayStateChange}
          onSeeking={handleSeeking}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handlePlayStateChange}
        />
        
        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col">
          {/* Progress bar */}
          <ProgressBar 
            duration={duration} 
            intervals={progress.intervals}
            currentTime={currentTime}
            className="mb-2"
          />
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button 
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="bg-blue-500 px-3 py-1 rounded-full text-white text-xs font-medium">
              {progress.percentage}% completed
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="mt-2 flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {progress.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default VideoPlayer;