import { VideoProgress } from '../types';

const STORAGE_KEY = 'video-progress';

/**
 * Get all video progress from local storage
 */
export const getAllProgress = (): Record<string, VideoProgress> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting progress from storage:', error);
    return {};
  }
};

/**
 * Get progress for a specific video
 */
export const getVideoProgress = (videoId: string): VideoProgress | null => {
  try {
    const allProgress = getAllProgress();
    return allProgress[videoId] || null;
  } catch (error) {
    console.error('Error getting video progress:', error);
    return null;
  }
};

/**
 * Save progress for a specific video
 */
export const saveVideoProgress = (progress: VideoProgress): void => {
  try {
    const allProgress = getAllProgress();
    allProgress[progress.videoId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving video progress:', error);
  }
};

/**
 * Clear progress for a specific video
 */
export const clearVideoProgress = (videoId: string): void => {
  try {
    const allProgress = getAllProgress();
    if (allProgress[videoId]) {
      delete allProgress[videoId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    }
  } catch (error) {
    console.error('Error clearing video progress:', error);
  }
};