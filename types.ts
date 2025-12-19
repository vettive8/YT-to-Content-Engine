
export type AppLanguage = 'en' | 'pl';

export interface TranscriptionSegment {
  start: string; // "MM:SS"
  end: string;
  speaker: string;
  text: string;
}

export interface TranscriptionResult {
  title: string;
  fullText: string;
  segments: TranscriptionSegment[];
  language: AppLanguage;
  videoId: string;
}

export interface ContentPack {
  seoBlog: {
    title: string;
    summary: string;
    sections: { heading: string; content: string }[];
    takeaways: string[];
  };
  linkedInPost: string;
  twitterThread: string[];
  quoteCards: string[];
  chapters: { timestamp: string; title: string }[];
}

export interface JobState {
  id: string;
  url: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  result?: TranscriptionResult;
  contentPack?: ContentPack;
  language: AppLanguage;
  diarization: boolean;
}
