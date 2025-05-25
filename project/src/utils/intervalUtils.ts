import { VideoInterval } from '../types';

/**
 * Merge overlapping intervals to calculate unique viewing time
 */
export const mergeIntervals = (intervals: VideoInterval[]): VideoInterval[] => {
  if (intervals.length <= 1) return intervals;

  // Sort intervals by start time
  const sortedIntervals = [...intervals].sort((a, b) => a.start - b.start);
  
  const result: VideoInterval[] = [];
  let current = { ...sortedIntervals[0] };
  
  for (let i = 1; i < sortedIntervals.length; i++) {
    const next = sortedIntervals[i];
    
    // If current interval overlaps with next interval
    if (current.end >= next.start) {
      // Extend current interval if needed
      current.end = Math.max(current.end, next.end);
    } else {
      // Add current interval to result and move to next
      result.push(current);
      current = { ...next };
    }
  }
  
  // Add the last interval
  result.push(current);
  
  return result;
};

/**
 * Calculate total unique time watched from intervals
 */
export const calculateTotalWatched = (intervals: VideoInterval[]): number => {
  const merged = mergeIntervals(intervals);
  return merged.reduce((total, interval) => {
    return total + (interval.end - interval.start);
  }, 0);
};

/**
 * Calculate progress percentage based on total watched time and video duration
 */
export const calculatePercentage = (totalWatched: number, duration: number): number => {
  if (duration === 0) return 0;
  const percentage = (totalWatched / duration) * 100;
  return Math.min(Math.round(percentage), 100);
};

/**
 * Add a new interval to existing intervals
 */
export const addInterval = (
  intervals: VideoInterval[],
  newInterval: VideoInterval
): VideoInterval[] => {
  // Don't add invalid intervals
  if (newInterval.start >= newInterval.end) return intervals;
  
  return [...intervals, newInterval];
};