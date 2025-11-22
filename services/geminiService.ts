import { GoogleGenAI } from "@google/genai";
import { TextConfig } from '../types';

// Initialize the client with the API key from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTextImage = async (config: TextConfig): Promise<string> => {
  // Construct a detailed prompt based on user selection
  
  // Combine selected effects with custom effects
  const effectList = [...config.effects];
  if (config.customEffect && config.customEffect.trim() !== "") {
    effectList.push(config.customEffect as any);
  }
  const effectsString = effectList.length > 0 ? ` with effects: ${effectList.join(', ')}` : '';
  
  // Determine Background
  let backgroundDesc = '';
  if (config.customBackground && config.customBackground.trim() !== "") {
     backgroundDesc = `on a ${config.customBackground}`;
  } else {
    switch (config.backgroundMode) {
      case 'dark':
        backgroundDesc = 'on a solid dark studio background';
        break;
      case 'light':
        backgroundDesc = 'on a clean white studio background';
        break;
      case 'abstract':
        backgroundDesc = 'on a creative abstract artistic background matching the text style';
        break;
    }
  }

  // Determine Style (Custom overrides selected)
  const styleToUse = (config.customStyle && config.customStyle.trim() !== "") 
    ? config.customStyle 
    : config.style;

  let creativityPrompt = '';
  if (config.creativityLevel > 3) {
    creativityPrompt = ' highly artistic, creative, expressive, masterpiece, cinematic lighting';
  } else {
    creativityPrompt = ' clean, centered, legible, high definition, professional design';
  }

  const prompt = `A professional high-quality typography image of the text "${config.text}". Style: ${styleToUse}${effectsString}. ${backgroundDesc}. The text should be the main focus, ${creativityPrompt}. 8k resolution, detailed texture.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          // imageSize not supported on flash-image
        }
      },
    });

    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data received from API.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};