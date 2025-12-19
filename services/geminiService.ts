
import { GoogleGenAI, Type } from "@google/genai";
import { TranscriptionResult, ContentPack, AppLanguage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Uses Google Search grounding to find the actual metadata and transcript 
 * for the provided YouTube URL to avoid hallucinations.
 */
export async function generateTranscriptionSimulation(
  url: string, 
  language: AppLanguage, 
  diarization: boolean
): Promise<TranscriptionResult> {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    TASK: Provide a high-quality transcript excerpt for this specific YouTube video: ${url}
    LANGUAGE: ${language === 'en' ? 'English' : 'Polish'}
    DIARIZATION: ${diarization ? 'Enabled' : 'Disabled'}

    CRITICAL INSTRUCTIONS:
    1. Use Google Search to find the ACTUAL video title, creator (e.g., Szymon Negacz), and content.
    2. DO NOT hallucinate common memes or songs (like "Gdzie jest biały węgorz").
    3. If you can find the actual transcript or captions, use them to create a 10-15 segment excerpt.
    4. If the video is a business/sales podcast (like Szymon Negacz's content), the tone must be professional and reflect the actual topics discussed (sales, management, etc.).
    5. Provide Speaker labels if diarization is enabled.
    
    Format the output as JSON according to the schema.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          fullText: { type: Type.STRING },
          segments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                start: { type: Type.STRING },
                end: { type: Type.STRING },
                speaker: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["start", "end", "speaker", "text"]
            }
          }
        },
        required: ["title", "fullText", "segments"]
      }
    }
  });

  const result = JSON.parse(response.text) as TranscriptionResult;
  result.language = language;
  result.videoId = url.split('v=')[1]?.split('&')[0] || 'unknown';
  return result;
}

export async function generateContentPack(
  transcript: TranscriptionResult
): Promise<ContentPack> {
  const model = 'gemini-3-pro-preview';
  const langLabel = transcript.language === 'en' ? 'English' : 'Polish';

  const prompt = `
    Based on this transcript in ${langLabel}, generate a complete Content Distribution Pack.
    Transcript Title: ${transcript.title}
    Full Text: ${transcript.fullText}

    Include:
    1. 1 SEO Blog Post (Summary, Headings, Takeaways)
    2. 1 LinkedIn Post
    3. 1 Twitter/X Thread (8-12 tweets)
    4. 5 Quote Cards (short powerful quotes with timestamps)
    5. 10 YouTube Chapters with timestamps

    All output must be in ${langLabel}.
    Ensure the content matches the expertise of the speaker (e.g., if it's Szymon Negacz, focus on sales/business).
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          seoBlog: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    content: { type: Type.STRING }
                  }
                }
              },
              takeaways: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          linkedInPost: { type: Type.STRING },
          twitterThread: { type: Type.ARRAY, items: { type: Type.STRING } },
          quoteCards: { type: Type.ARRAY, items: { type: Type.STRING } },
          chapters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                title: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text) as ContentPack;
}
