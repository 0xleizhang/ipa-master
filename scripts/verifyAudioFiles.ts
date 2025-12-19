import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IPA_DATA } from '../constants/ipaData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mp3Dir = path.join(__dirname, '..', 'public', 'mp3');

console.log('🔍 Verifying IPA audio files (WAV)...');
console.log(`Directory: ${mp3Dir}\n`);

if (!fs.existsSync(mp3Dir)) {
    console.error(`❌ Error: Directory ${mp3Dir} does not exist!`);
    process.exit(1);
}

let missingFiles = [];
let foundFiles = [];

IPA_DATA.forEach(item => {
    const { symbol, filename } = item;
    const wavFile = `${filename}.wav`;
    const filePath = path.join(mp3Dir, wavFile);

    if (fs.existsSync(filePath)) {
        foundFiles.push({ symbol, filename: wavFile });
        console.log(`✅ ${symbol.padEnd(4)} -> ${wavFile}`);
    } else {
        missingFiles.push({ symbol, filename: wavFile });
        console.log(`❌ ${symbol.padEnd(4)} -> ${wavFile} (MISSING)`);
    }
});

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Statistics:`);
console.log(`   Total symbols: ${IPA_DATA.length}`);
console.log(`   Found:         ${foundFiles.length}`);
console.log(`   Missing:       ${missingFiles.length}`);

if (missingFiles.length > 0) {
    console.log('\n⚠️  The following files are missing:');
    missingFiles.forEach(({ symbol, filename }) => {
        console.log(`   ${symbol.padEnd(4)} -> ${filename}`);
    });
    console.log('\nTip: Run "npm run generate-audio" to generate missing files.');
    process.exit(1);
} else {
    console.log('\n✨ All audio files are present and verified!');
    process.exit(0);
}
