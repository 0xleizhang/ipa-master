#!/usr/bin/env node

/**
 * 验证所有IPA符号的MP3文件是否存在
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IPA符号到MP3文件的映射
const IPA_TO_MP3_MAP = {
  // Vowels - Long
  'i:': 'iː.mp3',
  'ɑ:': 'ɑː.mp3',
  'ɔ:': 'ɔː.mp3',
  'u:': 'uː.mp3',
  'ɜ:': 'ɜː.mp3',
  
  // Vowels - Short
  'ɪ': 'ɪ.mp3',
  'e': 'e.mp3',
  'æ': 'æ.mp3',
  'ʌ': 'ʌ.mp3',
  'ɒ': 'ɒ.mp3',
  'ʊ': 'ʊ.mp3',
  'ə': 'ə.mp3',
  
  // Diphthongs
  'eɪ': 'eɪ.mp3',
  'aɪ': 'aɪ.mp3',
  'ɔɪ': 'ɔɪ.mp3',
  'əʊ': 'əʊ.mp3',
  'aʊ': 'aʊ.mp3',
  'ɪə': 'ɪə.mp3',
  'eə': 'eə.mp3',
  'ʊə': 'ʊə.mp3',
  
  // Consonants - Plosives
  'p': 'p.mp3',
  'b': 'b.mp3',
  't': 't.mp3',
  'd': 'd.mp3',
  'k': 'k.mp3',
  'g': 'g.mp3',
  
  // Consonants - Fricatives
  'f': 'f.mp3',
  'v': 'v.mp3',
  'θ': 'θ.mp3',
  'ð': 'ð.mp3',
  's': 's.mp3',
  'z': 'z.mp3',
  'ʃ': 'ʃ.mp3',
  'ʒ': 'ʒ.mp3',
  'h': 'h.mp3',
  
  // Consonants - Affricates
  'tʃ': 'tʃ.mp3',
  'dʒ': 'dʒ.mp3',
  
  // Consonants - Nasals
  'm': 'm.mp3',
  'n': 'n.mp3',
  'ŋ': 'ŋ.mp3',
  
  // Consonants - Approximants
  'l': 'l.mp3',
  'r': 'r.mp3',
  'w': 'w.mp3',
  'j': 'j.mp3',
};

const mp3Dir = path.join(__dirname, '..', 'public', 'mp3_files');

console.log('🔍 验证IPA音标MP3文件...\n');
console.log(`MP3目录: ${mp3Dir}\n`);

let missingFiles = [];
let foundFiles = [];

for (const [symbol, filename] of Object.entries(IPA_TO_MP3_MAP)) {
  const filePath = path.join(mp3Dir, filename);
  if (fs.existsSync(filePath)) {
    foundFiles.push({ symbol, filename });
    console.log(`✅ ${symbol} -> ${filename}`);
  } else {
    missingFiles.push({ symbol, filename });
    console.log(`❌ ${symbol} -> ${filename} (文件不存在)`);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 统计:`);
console.log(`   总计: ${Object.keys(IPA_TO_MP3_MAP).length} 个音标`);
console.log(`   找到: ${foundFiles.length} 个文件`);
console.log(`   丢失: ${missingFiles.length} 个文件`);

if (missingFiles.length > 0) {
  console.log('\n⚠️  以下文件丢失:');
  missingFiles.forEach(({ symbol, filename }) => {
    console.log(`   ${symbol} -> ${filename}`);
  });
  process.exit(1);
} else {
  console.log('\n✨ 所有音标文件都已找到！');
  process.exit(0);
}
