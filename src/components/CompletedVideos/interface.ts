export interface VideoData {
    id: string;
    poster: string;
    stars: number;
  }
  
 export interface CompletedVideosProps {
    isIntroduction: (e: boolean) => void;
    testIsActive: (e: boolean) => void;
    completedVideosActive: (e: boolean) => void;
  }