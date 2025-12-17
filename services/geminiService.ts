import { GoogleGenAI, Type } from '@google/genai';
import { AssessmentResult } from '../types';

export const assessPronunciation = async (
  audioBase64: string,
  targetSymbol: string,
  targetWord: string,
  apiKey: string
): Promise<AssessmentResult> => {
  if (!apiKey) {
    console.error('API Key is missing');
    return {
      score: 0,
      feedback: 'API Key is missing. Please configure it in settings.',
      isCorrect: false
    };
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert English phonology teacher (IPA expert). 
    The user is trying to pronounce the word "${targetWord}" which targets the IPA sound /${targetSymbol}/.
    
    Analyze the provided audio. 
    1. Determine if the target sound /${targetSymbol}/ was pronounced correctly within the context of the word.
    2. Give a score from 0 to 100 based on the accuracy of that specific sound.
    3. Provide brief, constructive feedback on how they articulated the sound (tongue position, lip shape, voicing).
    
    Return pure JSON with this structure:
    {
      "score": number,
      "feedback": "string",
      "isCorrect": boolean
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'audio/webm',
              data: audioBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
            },
            feedback: {
              type: Type.STRING,
            },
            isCorrect: {
              type: Type.BOOLEAN,
            },
          },
        },
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("Empty response");
    }
    const result = JSON.parse(text) as AssessmentResult;
    return result;
  } catch (error) {
    console.error('Gemini assessment failed:', error);
    return {
      score: 0,
      feedback: 'Could not analyze audio. Please check your API key or internet connection.',
      isCorrect: false
    };
  }
};
