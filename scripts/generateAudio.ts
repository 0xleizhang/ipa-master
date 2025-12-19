/**
 * 一次性脚本：使用 Gemini API 生成 IPA 音标的发音音频
 * 运行方式: npx tsx scripts/generateAudio.ts [--force]
 * 
 * 参数:
 *   --force  强制重新生成所有音标，否则只生成不存在的文件
 * 
 * 从 .env 文件中读取 GEMINI_API_KEY
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { IPA_DATA } from '../constants/ipaData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载 .env 文件 (先检查 scripts/.env，再检查项目根目录)
const envPath = fs.existsSync(path.join(__dirname, '.env')) 
  ? path.join(__dirname, '.env')
  : path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

/**
 * Create a WAV file header for PCM audio data
 */
function createWavHeader(dataLength: number, sampleRate: number, channels: number = 1, bitsPerSample: number = 16): Buffer {
  const headerLength = 44;
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const header = Buffer.alloc(headerLength);

  // RIFF header
  header.write('RIFF', 0);                          // ChunkID
  header.writeUInt32LE(dataLength + 36, 4);         // ChunkSize
  header.write('WAVE', 8);                          // Format

  // fmt sub-chunk
  header.write('fmt ', 12);                         // Subchunk1ID
  header.writeUInt32LE(16, 16);                     // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20);                      // AudioFormat (1 = PCM)
  header.writeUInt16LE(channels, 22);               // NumChannels
  header.writeUInt32LE(sampleRate, 24);             // SampleRate
  header.writeUInt32LE(byteRate, 28);               // ByteRate
  header.writeUInt16LE(blockAlign, 32);             // BlockAlign
  header.writeUInt16LE(bitsPerSample, 34);          // BitsPerSample

  // data sub-chunk
  header.write('data', 36);                         // Subchunk2ID
  header.writeUInt32LE(dataLength, 40);             // Subchunk2Size

  return header;
}

async function generateAudioForSymbol(
  ai: GoogleGenAI,
  ph: string,
  symbol: string,
  exampleWord: string,
  filename: string,
  outputDir: string
): Promise<string | null> {
  // 使用 SSML phoneme 标签直接发 IPA 音素，使用 ph 属性（已包含正确的 IPA 符号）
  const prompt = `<speak><phoneme alphabet="ipa" ph="${ph}">a</phoneme></speak>`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Kore' // Clear female voice
            }
          }
        }
      }
    });

    // Extract audio data from response
    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts?.[0]) {
      console.error(`No audio data for ${symbol}`);
      return null;
    }

    const part = candidate.content.parts[0];
    if ('inlineData' in part && part.inlineData?.data) {
      const audioBase64 = part.inlineData.data;
      let audioBuffer = Buffer.from(audioBase64, 'base64');
      const mimeType = part.inlineData.mimeType || 'unknown';
      
      console.log(`    MIME type: ${mimeType}`);
      
      let ext = 'wav'; // default to wav
      
      // Check if it's raw PCM audio (L16 format)
      if (mimeType.includes('L16') || mimeType.includes('pcm')) {
        // Extract sample rate from MIME type (e.g., "audio/L16;codec=pcm;rate=24000")
        const rateMatch = mimeType.match(/rate=(\d+)/);
        const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;
        
        // Add WAV header to make it playable
        const wavHeader = createWavHeader(audioBuffer.length, sampleRate);
        audioBuffer = Buffer.concat([wavHeader, audioBuffer]);
        ext = 'wav';
      } else if (mimeType.includes('wav')) {
        ext = 'wav';
      } else if (mimeType.includes('mp3') || mimeType.includes('mpeg')) {
        ext = 'mp3';
      } else if (mimeType.includes('ogg')) {
        ext = 'ogg';
      } else if (mimeType.includes('webm')) {
        ext = 'webm';
      } else {
        // Try to detect from magic bytes
        const header = audioBuffer.slice(0, 12).toString('hex');
        if (header.startsWith('52494646')) ext = 'wav';
        else if (header.startsWith('4f676753')) ext = 'ogg';
        else if (header.startsWith('fff') || header.startsWith('494433')) ext = 'mp3';
        else if (header.startsWith('1a45dfa3')) ext = 'webm';
      }
      
      const filepath = path.join(outputDir, `${filename}.${ext}`);
      fs.writeFileSync(filepath, audioBuffer);
      return ext;
    }

    console.error(`Unexpected response format for ${symbol}`);
    return null;
  } catch (error) {
    console.error(`Failed to generate audio for ${symbol}:`, error);
    return null;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const limit = parseInt(process.env.LIMIT || '0', 10); // 0 表示不限制
  const forceRegenerate = process.argv.includes('--force');
  
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY not found in .env file');
    console.log('Please create a .env file in the project root with:');
    console.log('GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
  }

  // Create audio directory
  const mp3Dir = path.join(__dirname, 'mp3'); // Keep folder name for compatibility
  if (!fs.existsSync(mp3Dir)) {
    fs.mkdirSync(mp3Dir, { recursive: true });
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const symbolsToProcess = limit > 0 ? IPA_DATA.slice(0, limit) : IPA_DATA;
  
  console.log(`Starting audio generation for ${symbolsToProcess.length} IPA symbols...`);
  if (limit > 0) {
    console.log(`(Limited to first ${limit} symbols for testing)`);
  }
  if (forceRegenerate) {
    console.log(`Mode: Force regenerate all files`);
  } else {
    console.log(`Mode: Skip existing files (use --force to regenerate all)`);
  }
  console.log(`Audio files will be saved to: ${mp3Dir}`);
  console.log('This may take a few minutes...\n');

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < symbolsToProcess.length; i++) {
    const { symbol, ph, filename, exampleWord } = symbolsToProcess[i];
    
    // Check if file already exists
    const existingFile = fs.readdirSync(mp3Dir).find(f => f.startsWith(filename + '.'));
    if (existingFile && !forceRegenerate) {
      skippedCount++;
      console.log(`[${i + 1}/${symbolsToProcess.length}] Skipping /${symbol}/ - ${existingFile} already exists`);
      continue;
    }
    
    console.log(`[${i + 1}/${symbolsToProcess.length}] Generating audio for /${symbol}/ (${exampleWord})...`);
    
    const ext = await generateAudioForSymbol(ai, ph, symbol, exampleWord, filename, mp3Dir);
    
    if (ext) {
      successCount++;
      console.log(`  ✓ Success - saved as ${filename}.${ext}`);
    } else {
      failCount++;
      console.log(`  ✗ Failed`);
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n========================================`);
  console.log(`Generation complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Skipped: ${skippedCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log(`  Audio files saved to: ${mp3Dir}`);
}

main().catch(console.error);
