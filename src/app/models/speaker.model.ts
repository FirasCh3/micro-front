export interface Speaker {
  id: number;
  filename: string;
  displayName: string;
  url: string;
  isPlaying: boolean;
  color: string;
  volume: number;
  currentTime: number;
  duration: number;
  progress: number;
  audioElement?: HTMLAudioElement;
}