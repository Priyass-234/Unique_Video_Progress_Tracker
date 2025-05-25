export interface VideoInterval {
  start: number;
  end: number;
}

export interface VideoProgress {
  videoId: string;
  intervals: VideoInterval[];
  lastPosition: number;
  totalWatched: number;
  percentage: number;
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
}