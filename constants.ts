import { IPASymbol } from './types';

// The full 48 IPA symbols commonly used in English teaching (especially in Asia).
// Using shared video resource: https://www.youtube.com/watch?v=Sw36F_UcIn8
const SHARED_VIDEO_ID = 'Sw36F_UcIn8';

export const IPA_DATA: IPASymbol[] = [
  // ==================== VOWELS (20) ====================
  // Note: All vowels are technically voiced.
  
  // --- Monophthongs (Long) ---
  {
    symbol: 'i:',
    name: 'Long i',
    section: 'Vowels',
    category: 'Monophthongs (Long)',
    voicing: 'Voiced',
    exampleWord: 'sheep',
    sound: 'eee',
    description: 'Long sound like in "see". Smile wide.',
    chineseTip: '【像拼音 i】但更长更紧绷。嘴角用力向两边拉开，像在微笑。符号中的冒号 (:) 代表长音。',
    commonSpellings: ['ee', 'ea', 'ie', 'e', 'ey'],
    examples: [
      { word: 'sheep', transcription: '/ʃiːp/' },
      { word: 'eat', transcription: '/iːt/' },
      { word: 'see', transcription: '/siː/' }
    ],
    sentence: 'The sheep falls asleep.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɑ:',
    name: 'Long a',
    section: 'Vowels',
    category: 'Monophthongs (Long)',
    voicing: 'Voiced',
    exampleWord: 'car',
    sound: 'ah',
    description: 'Deep sound like in "car". Open mouth wide.',
    chineseTip: '【像拼音 a】看医生检查喉咙时张大嘴发的“啊”。口腔后部打开，声音深沉。',
    commonSpellings: ['ar', 'a', 'al'],
    examples: [
      { word: 'car', transcription: '/kɑː/' },
      { word: 'father', transcription: '/ˈfɑːðə/' },
      { word: 'art', transcription: '/ɑːt/' }
    ],
    sentence: 'Park the car in the yard.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɔ:',
    name: 'Long o',
    section: 'Vowels',
    category: 'Monophthongs (Long)',
    voicing: 'Voiced',
    exampleWord: 'door',
    sound: 'or',
    description: 'Long "or" sound. Round lips significantly.',
    chineseTip: '【像汉字“哦”】双唇用力收圆向前突出，发音拉长。符号像反写的 c 加上冒号。',
    commonSpellings: ['or', 'aw', 'au', 'al', 'o'],
    examples: [
      { word: 'door', transcription: '/dɔː/' },
      { word: 'saw', transcription: '/sɔː/' },
      { word: 'walk', transcription: '/wɔːk/' }
    ],
    sentence: 'Paul saw a small ball.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'u:',
    name: 'Long u',
    section: 'Vowels',
    category: 'Monophthongs (Long)',
    voicing: 'Voiced',
    exampleWord: 'blue',
    sound: 'ooo',
    description: 'Long "oo" sound. Lips very rounded.',
    chineseTip: '【像拼音 u】双唇收缩成一个小圆孔，肌肉紧张，发长音“乌”。',
    commonSpellings: ['oo', 'ue', 'ew', 'u', 'o'],
    examples: [
      { word: 'blue', transcription: '/bluː/' },
      { word: 'food', transcription: '/fuːd/' },
      { word: 'shoe', transcription: '/ʃuː/' }
    ],
    sentence: 'The moon is blue tonight.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɜ:',
    name: 'Long er',
    section: 'Vowels',
    category: 'Monophthongs (Long)',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'bird',
    sound: 'ur',
    description: 'Long central vowel. Relaxed lips.',
    chineseTip: '【难点】像汉字“饿”，但舌头要平放或微微卷起，不要接触口腔任何部位。符号像反写的 3。',
    commonSpellings: ['ir', 'ur', 'er', 'ear', 'or'],
    examples: [
      { word: 'bird', transcription: '/bɜːd/' },
      { word: 'girl', transcription: '/gɜːl/' },
      { word: 'work', transcription: '/wɜːk/' }
    ],
    sentence: 'The nurse works early.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Monophthongs (Short) ---
  {
    symbol: 'ɪ',
    name: 'Short i',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'sit',
    sound: 'ih',
    description: 'Short and relaxed. Like "i" in "sit".',
    chineseTip: '【易错】不是拼音 i！发音松弛、急促，介于“一”和“耶”之间。腹部用力。符号像罗马数字 I。',
    commonSpellings: ['i', 'y', 'ui', 'e'],
    examples: [
      { word: 'sit', transcription: '/sɪt/' },
      { word: 'pig', transcription: '/pɪg/' },
      { word: 'fish', transcription: '/fɪʃ/' }
    ],
    sentence: 'The big pig sits in the pit.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'e',
    name: 'Short e',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    exampleWord: 'bed',
    sound: 'eh',
    description: 'Open mouth slightly more than /ɪ/.',
    chineseTip: '【像汉字“耶”】但去掉了尾音。嘴角微咧，上下齿间可容纳一指。',
    commonSpellings: ['e', 'ea'],
    examples: [
      { word: 'bed', transcription: '/bed/' },
      { word: 'pen', transcription: '/pen/' },
      { word: 'egg', transcription: '/eg/' }
    ],
    sentence: 'Ted fed the red hen.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'æ',
    name: 'Short a',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'cat',
    sound: 'aa',
    description: 'Jaw drops down, tongue flat. "Trap" vowel.',
    chineseTip: '【梅花音】中文无此音。嘴巴张大成方形，像发“阿”的嘴型，但发“哎”的音。符号是 a 和 e 的合体。',
    commonSpellings: ['a'],
    examples: [
      { word: 'cat', transcription: '/kæt/' },
      { word: 'apple', transcription: '/ˈæpl/' },
      { word: 'map', transcription: '/mæp/' }
    ],
    sentence: 'The fat cat sat on a mat.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ʌ',
    name: 'Short u',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    exampleWord: 'cup',
    sound: 'uh',
    description: 'Short, central vowel. Like "u" in "cup".',
    chineseTip: '【短阿】短促、有力地发“阿”。像被人打了一拳发出的声音。符号像倒过来的 V。',
    commonSpellings: ['u', 'o', 'ou'],
    examples: [
      { word: 'cup', transcription: '/kʌp/' },
      { word: 'bus', transcription: '/bʌs/' },
      { word: 'sun', transcription: '/sʌn/' }
    ],
    sentence: 'Cut the bun for lunch.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɒ',
    name: 'Short o',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    exampleWord: 'hot',
    sound: 'o',
    description: 'Round lips wide. British "lot" vowel.',
    chineseTip: '【短奥】嘴张大，双唇呈圆形，短促发“奥”。',
    commonSpellings: ['o', 'a'],
    examples: [
      { word: 'hot', transcription: '/hɒt/' },
      { word: 'dog', transcription: '/dɒg/' },
      { word: 'box', transcription: '/bɒks/' }
    ],
    sentence: 'The pot is very hot.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ʊ',
    name: 'Short oo',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    exampleWord: 'book',
    sound: 'uh',
    description: 'Lips rounded slightly. "Foot" vowel.',
    chineseTip: '【短乌】双唇微圆，比 u: 放松，短促发“乌”。符号像马蹄铁。',
    commonSpellings: ['oo', 'u', 'ou'],
    examples: [
      { word: 'book', transcription: '/bʊk/' },
      { word: 'good', transcription: '/gʊd/' },
      { word: 'put', transcription: '/pʊt/' }
    ],
    sentence: 'Look at the good cook.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ə',
    name: 'Schwa',
    section: 'Vowels',
    category: 'Monophthongs (Short)',
    voicing: 'Voiced',
    exampleWord: 'sofa',
    sound: 'uh',
    description: 'The most common sound. Very weak, unstressed.',
    chineseTip: '【中央元音】英语中最常见的音。嘴唇微张，完全放松，极其模糊短促地发“额”。',
    commonSpellings: ['a', 'e', 'i', 'o', 'u'],
    examples: [
      { word: 'about', transcription: '/əˈbaʊt/' },
      { word: 'banana', transcription: '/bəˈnɑːnə/' },
      { word: 'teacher', transcription: '/ˈtiːtʃə/' }
    ],
    sentence: 'A banana for breakfast.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Diphthongs ---
  {
    symbol: 'eɪ',
    name: 'ei',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'day',
    sound: 'ay',
    description: 'Glide from /e/ to /ɪ/.',
    chineseTip: '【字母A的发音】由“耶”滑向“一”，口型由开变合。',
    commonSpellings: ['ay', 'a', 'ai', 'ea', 'ey'],
    examples: [
      { word: 'cake', transcription: '/keɪk/' },
      { word: 'rain', transcription: '/reɪn/' },
      { word: 'day', transcription: '/deɪ/' }
    ],
    sentence: 'Stay and play in the rain.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'aɪ',
    name: 'ai',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'my',
    sound: 'eye',
    description: 'Glide from /a/ to /ɪ/.',
    chineseTip: '【像汉字“爱”】由“阿”滑向“一”。字母 I 的发音。',
    commonSpellings: ['i', 'igh', 'y', 'ie'],
    examples: [
      { word: 'bike', transcription: '/baɪk/' },
      { word: 'fly', transcription: '/flaɪ/' },
      { word: 'time', transcription: '/taɪm/' }
    ],
    sentence: 'I like to fly kites.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɔɪ',
    name: 'oi',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'boy',
    sound: 'oy',
    description: 'Glide from /ɔ:/ to /ɪ/.',
    chineseTip: '【奥+伊】由圆唇的“奥”滑向扁唇的“一”。',
    commonSpellings: ['oy', 'oi'],
    examples: [
      { word: 'boy', transcription: '/bɔɪ/' },
      { word: 'toy', transcription: '/tɔɪ/' },
      { word: 'coin', transcription: '/kɔɪn/' }
    ],
    sentence: 'The boy has a loud voice.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'əʊ',
    name: 'ou',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'go',
    sound: 'oh',
    description: 'Glide from /ə/ to /ʊ/.',
    chineseTip: '【字母O的发音】由“额”滑向“乌”，嘴唇最后要收圆。',
    commonSpellings: ['o', 'ow', 'oa', 'oe'],
    examples: [
      { word: 'go', transcription: '/gəʊ/' },
      { word: 'nose', transcription: '/nəʊz/' },
      { word: 'boat', transcription: '/bəʊt/' }
    ],
    sentence: 'Go home on the boat.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'aʊ',
    name: 'au',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'cow',
    sound: 'ow',
    description: 'Glide from /a/ to /ʊ/.',
    chineseTip: '【痛叫声】由“阿”滑向“乌”，像被掐了一下大叫“傲！”。',
    commonSpellings: ['ow', 'ou'],
    examples: [
      { word: 'cow', transcription: '/kaʊ/' },
      { word: 'house', transcription: '/haʊs/' },
      { word: 'mouse', transcription: '/maʊs/' }
    ],
    sentence: 'The cow is out of the house.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ɪə',
    name: 'ear',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'ear',
    sound: 'ear',
    description: 'Glide from /ɪ/ to /ə/.',
    chineseTip: '【一+额】从扁唇滑向自然放松的中央元音。',
    commonSpellings: ['ear', 'eer', 'ere'],
    examples: [
      { word: 'ear', transcription: '/ɪə/' },
      { word: 'beer', transcription: '/bɪə/' },
      { word: 'here', transcription: '/hɪə/' }
    ],
    sentence: 'I can hear you near here.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'eə',
    name: 'air',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'hair',
    sound: 'air',
    description: 'Glide from /e/ to /ə/.',
    chineseTip: '【哎+额】从“哎”滑向放松的中央元音。',
    commonSpellings: ['air', 'are', 'ear', 'ere'],
    examples: [
      { word: 'hair', transcription: '/heə/' },
      { word: 'care', transcription: '/keə/' },
      { word: 'bear', transcription: '/beə/' }
    ],
    sentence: 'Take care of the bear.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ʊə',
    name: 'ure',
    section: 'Diphthongs',
    category: 'Diphthongs',
    voicing: 'Voiced',
    exampleWord: 'tour',
    sound: 'oor',
    description: 'Glide from /ʊ/ to /ə/.',
    chineseTip: '【乌+额】从圆唇滑向放松的中央元音。',
    commonSpellings: ['ure', 'our', 'oor'],
    examples: [
      { word: 'tour', transcription: '/tʊə/' },
      { word: 'sure', transcription: '/ʃʊə/' },
      { word: 'poor', transcription: '/pʊə/' }
    ],
    sentence: 'Are you sure about the tour?',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // ==================== CONSONANTS (28) ====================

  // --- Plosives ---
  {
    symbol: 'p',
    name: 'p',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiceless',
    exampleWord: 'pen',
    sound: 'puh',
    description: 'Voiceless bilabial plosive.',
    chineseTip: '【像拼音 p】双唇紧闭，突然爆破。清辅音，摸喉咙不震动。',
    commonSpellings: ['p', 'pp'],
    examples: [
      { word: 'pen', transcription: '/pen/' },
      { word: 'pig', transcription: '/pɪg/' },
      { word: 'cup', transcription: '/kʌp/' }
    ],
    sentence: 'Please pay for the pot.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'b',
    name: 'b',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiced',
    exampleWord: 'bat',
    sound: 'buh',
    description: 'Voiced bilabial plosive.',
    chineseTip: '【像拼音 b】双唇紧闭爆破，但要振动声带。助记：像竖起大拇指点赞 (b -> best)。',
    commonSpellings: ['b', 'bb'],
    examples: [
      { word: 'bag', transcription: '/bæg/' },
      { word: 'bed', transcription: '/bed/' },
      { word: 'ball', transcription: '/bɔːl/' }
    ],
    sentence: 'The big baby sleeps.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 't',
    name: 't',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiceless',
    exampleWord: 'tea',
    sound: 'tuh',
    description: 'Voiceless alveolar plosive.',
    chineseTip: '【像拼音 t】舌尖抵住上齿龈爆破。清辅音。',
    commonSpellings: ['t', 'tt', 'ed'],
    examples: [
      { word: 'tea', transcription: '/tiː/' },
      { word: 'ten', transcription: '/ten/' },
      { word: 'cat', transcription: '/kæt/' }
    ],
    sentence: 'Tell the time perfectly.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'd',
    name: 'd',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiced',
    exampleWord: 'dog',
    sound: 'duh',
    description: 'Voiced alveolar plosive.',
    chineseTip: '【像拼音 d】舌尖抵住上齿龈爆破。浊辅音。',
    commonSpellings: ['d', 'dd', 'ed'],
    examples: [
      { word: 'dog', transcription: '/dɒg/' },
      { word: 'dad', transcription: '/dæd/' },
      { word: 'bed', transcription: '/bed/' }
    ],
    sentence: 'Dad dances daily.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'k',
    name: 'k',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiceless',
    exampleWord: 'cat',
    sound: 'kuh',
    description: 'Voiceless velar plosive.',
    chineseTip: '【像拼音 k】舌后部抵住软腭。清辅音。',
    commonSpellings: ['k', 'c', 'ck', 'ch', 'q'],
    examples: [
      { word: 'key', transcription: '/kiː/' },
      { word: 'car', transcription: '/kɑː/' },
      { word: 'luck', transcription: '/lʌk/' }
    ],
    sentence: 'Kate keeps the keys.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'g',
    name: 'g',
    section: 'Consonants',
    category: 'Plosives',
    voicing: 'Voiced',
    exampleWord: 'go',
    sound: 'guh',
    description: 'Voiced velar plosive.',
    chineseTip: '【像拼音 g】舌后部抵住软腭。浊辅音。',
    commonSpellings: ['g', 'gg', 'gh'],
    examples: [
      { word: 'go', transcription: '/gəʊ/' },
      { word: 'get', transcription: '/get/' },
      { word: 'bag', transcription: '/bæg/' }
    ],
    sentence: 'Go get the game.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Fricatives ---
  {
    symbol: 'f',
    name: 'f',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiceless',
    exampleWord: 'fish',
    sound: 'fff',
    description: 'Voiceless labiodental fricative.',
    chineseTip: '【唇齿音】上齿轻咬下唇，气流摩擦而出。清辅音。',
    commonSpellings: ['f', 'ff', 'ph', 'gh'],
    examples: [
      { word: 'fish', transcription: '/fɪʃ/' },
      { word: 'fan', transcription: '/fæn/' },
      { word: 'life', transcription: '/laɪf/' }
    ],
    sentence: 'Five funny fish.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'v',
    name: 'v',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'van',
    sound: 'vvv',
    description: 'Voiced labiodental fricative.',
    chineseTip: '【易错】上齿咬下唇发音，像 f 但要振动声带。不要发成 w (我)！',
    commonSpellings: ['v', 'f'],
    examples: [
      { word: 'van', transcription: '/væn/' },
      { word: 'very', transcription: '/ˈveri/' },
      { word: 'five', transcription: '/faɪv/' }
    ],
    sentence: 'Very vivid violet van.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 's',
    name: 's',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiceless',
    exampleWord: 'sun',
    sound: 'sss',
    description: 'Voiceless alveolar fricative.',
    chineseTip: '【像拼音 s】蛇吐信子的声音“丝”。清辅音。',
    commonSpellings: ['s', 'ss', 'c', 'sc'],
    examples: [
      { word: 'sun', transcription: '/sʌn/' },
      { word: 'see', transcription: '/siː/' },
      { word: 'bus', transcription: '/bʌs/' }
    ],
    sentence: 'Six snakes sell snacks.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'z',
    name: 'z',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiced',
    exampleWord: 'zoo',
    sound: 'zzz',
    description: 'Voiced alveolar fricative.',
    chineseTip: '【像拼音 z】蜜蜂飞行的声音“嗡”。浊辅音。',
    commonSpellings: ['z', 'zz', 's'],
    examples: [
      { word: 'zoo', transcription: '/zuː/' },
      { word: 'zebra', transcription: '/ˈzebrə/' },
      { word: 'nose', transcription: '/nəʊz/' }
    ],
    sentence: 'Zebras zigzag in the zoo.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'θ',
    name: 'theta',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiceless',
    isDifficult: true,
    exampleWord: 'think',
    sound: 'th',
    description: 'Voiceless dental fricative.',
    chineseTip: '【咬舌音】中文无此音。舌尖必须伸出上下齿之间，吹气。符号像一个嘴巴吐出舌头。',
    commonSpellings: ['th'],
    examples: [
      { word: 'think', transcription: '/θɪŋk/' },
      { word: 'three', transcription: '/θriː/' },
      { word: 'mouth', transcription: '/maʊθ/' }
    ],
    sentence: 'I think three things.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ð',
    name: 'eth',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'this',
    sound: 'th',
    description: 'Voiced dental fricative.',
    chineseTip: '【咬舌音】舌尖伸出，震动声带。易混：不要发成 d 或 z。符号像 d 加一横。',
    commonSpellings: ['th'],
    examples: [
      { word: 'this', transcription: '/ðɪs/' },
      { word: 'that', transcription: '/ðæt/' },
      { word: 'mother', transcription: '/ˈmʌðə/' }
    ],
    sentence: 'This is my mother.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ʃ',
    name: 'esh',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiceless',
    exampleWord: 'she',
    sound: 'shh',
    description: 'Voiceless postalveolar fricative.',
    chineseTip: '【卷舌音】让别人安静时发的“嘘”。符号像拉长的 S (Silence)。',
    commonSpellings: ['sh', 'ch', 'ti', 'ss', 'ci'],
    examples: [
      { word: 'she', transcription: '/ʃiː/' },
      { word: 'shop', transcription: '/ʃɒp/' },
      { word: 'fish', transcription: '/fɪʃ/' }
    ],
    sentence: 'She sells sea shells.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ʒ',
    name: 'yogh',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'vision',
    sound: 'zhh',
    description: 'Voiced postalveolar fricative.',
    chineseTip: '【少见音】像汉字“日”但不卷舌，或者是“嘘”的浊音版。符号像数字 3。',
    commonSpellings: ['s', 'si', 'g'],
    examples: [
      { word: 'television', transcription: '/ˈtelɪvɪʒn/' },
      { word: 'pleasure', transcription: '/ˈpleʒə/' },
      { word: 'measure', transcription: '/ˈmeʒə/' }
    ],
    sentence: 'It is a pleasure.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'h',
    name: 'h',
    section: 'Consonants',
    category: 'Fricatives',
    voicing: 'Voiceless',
    exampleWord: 'hat',
    sound: 'hhh',
    description: 'Voiceless glottal fricative.',
    chineseTip: '【像拼音 h】像是哈气或呵气，气流不受阻碍。',
    commonSpellings: ['h', 'wh'],
    examples: [
      { word: 'hat', transcription: '/hæt/' },
      { word: 'home', transcription: '/həʊm/' },
      { word: 'hello', transcription: '/həˈləʊ/' }
    ],
    sentence: 'Harry has a happy home.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'r',
    name: 'r',
    section: 'Consonants',
    category: 'Approximants',
    voicing: 'Voiced',
    isDifficult: true,
    exampleWord: 'red',
    sound: 'rrr',
    description: 'Alveolar approximant.',
    chineseTip: '【难点】舌尖向上卷起，但不要接触上膛！千万不要发成拼音 r (日) 的摩擦音。',
    commonSpellings: ['r', 'rr', 'wr'],
    examples: [
      { word: 'red', transcription: '/red/' },
      { word: 'run', transcription: '/rʌn/' },
      { word: 'carrot', transcription: '/ˈkærət/' }
    ],
    sentence: 'Run round the road.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Affricates ---
  {
    symbol: 'tʃ',
    name: 'ch',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiceless',
    exampleWord: 'chair',
    sound: 'ch',
    description: 'Voiceless postalveolar affricate.',
    chineseTip: '【像汉字“吃”】但双唇要收圆向前翘起。清辅音。',
    commonSpellings: ['ch', 'tch', 't'],
    examples: [
      { word: 'chair', transcription: '/tʃeə/' },
      { word: 'cheese', transcription: '/tʃiːz/' },
      { word: 'watch', transcription: '/wɒtʃ/' }
    ],
    sentence: 'Check the watch.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'dʒ',
    name: 'j',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiced',
    exampleWord: 'juice',
    sound: 'juh',
    description: 'Voiced postalveolar affricate.',
    chineseTip: '【像汉字“知”】但双唇收圆向前。符号像 d 和 z 的结合。',
    commonSpellings: ['j', 'g', 'dge'],
    examples: [
      { word: 'job', transcription: '/dʒɒb/' },
      { word: 'juice', transcription: '/dʒuːs/' },
      { word: 'bridge', transcription: '/brɪdʒ/' }
    ],
    sentence: 'Judge the ginger jam.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'tr',
    name: 'tr',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiceless',
    exampleWord: 'tree',
    sound: 'truh',
    description: 'Voiceless retroflex affricate sound.',
    chineseTip: '【像汉字“戳”】双唇收圆，舌尖抵住上齿龈后部再放开。',
    commonSpellings: ['tr'],
    examples: [
      { word: 'tree', transcription: '/triː/' },
      { word: 'try', transcription: '/traɪ/' },
      { word: 'train', transcription: '/treɪn/' }
    ],
    sentence: 'Try to train for the trip.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'dr',
    name: 'dr',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiced',
    exampleWord: 'dream',
    sound: 'druh',
    description: 'Voiced retroflex affricate sound.',
    chineseTip: '【像汉字“桌”】双唇收圆，声带振动。',
    commonSpellings: ['dr'],
    examples: [
      { word: 'dream', transcription: '/driːm/' },
      { word: 'dress', transcription: '/dres/' },
      { word: 'drive', transcription: '/draɪv/' }
    ],
    sentence: 'Don’t drink and drive.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ts',
    name: 'ts',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiceless',
    exampleWord: 'cats',
    sound: 'ts',
    description: 'Voiceless alveolar affricate.',
    chineseTip: '【像汉字“次”】舌尖抵住上齿龈，气流爆破摩擦而出。',
    commonSpellings: ['ts'],
    examples: [
      { word: 'cats', transcription: '/kæts/' },
      { word: 'hats', transcription: '/hæts/' },
      { word: 'let\'s', transcription: '/lets/' }
    ],
    sentence: 'The cats need hats.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'dz',
    name: 'dz',
    section: 'Consonants',
    category: 'Affricates',
    voicing: 'Voiced',
    exampleWord: 'beds',
    sound: 'dz',
    description: 'Voiced alveolar affricate.',
    chineseTip: '【像汉字“自”】声带振动。',
    commonSpellings: ['ds'],
    examples: [
      { word: 'beds', transcription: '/bedz/' },
      { word: 'hands', transcription: '/hændz/' },
      { word: 'friends', transcription: '/frendz/' }
    ],
    sentence: 'Friends shake hands.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Nasals ---
  {
    symbol: 'm',
    name: 'm',
    section: 'Consonants',
    category: 'Nasals',
    voicing: 'Voiced',
    exampleWord: 'man',
    sound: 'mmm',
    description: 'Bilabial nasal.',
    chineseTip: '【像拼音 m】闭嘴音。双唇紧闭，气流从鼻腔出来，发“呣”。',
    commonSpellings: ['m', 'mm', 'mb'],
    examples: [
      { word: 'man', transcription: '/mæn/' },
      { word: 'room', transcription: '/ruːm/' },
      { word: 'summer', transcription: '/ˈsʌmə/' }
    ],
    sentence: 'My mom makes money.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'n',
    name: 'n',
    section: 'Consonants',
    category: 'Nasals',
    voicing: 'Voiced',
    exampleWord: 'no',
    sound: 'nnn',
    description: 'Alveolar nasal.',
    chineseTip: '【像拼音 n】前鼻音。舌尖抵住上齿龈，气流从鼻腔出来。',
    commonSpellings: ['n', 'nn', 'kn', 'gn'],
    examples: [
      { word: 'no', transcription: '/nəʊ/' },
      { word: 'nine', transcription: '/naɪn/' },
      { word: 'sunny', transcription: '/ˈsʌni/' }
    ],
    sentence: 'Nine new neighbors.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'ŋ',
    name: 'ng',
    section: 'Consonants',
    category: 'Nasals',
    voicing: 'Voiced',
    exampleWord: 'sing',
    sound: 'ng',
    description: 'Velar nasal.',
    chineseTip: '【后鼻音】像汉字“昂”的后半段。舌后部抬起。符号像 n 带个弯勾。',
    commonSpellings: ['ng', 'n'],
    examples: [
      { word: 'sing', transcription: '/sɪŋ/' },
      { word: 'bank', transcription: '/bæŋk/' },
      { word: 'finger', transcription: '/ˈfɪŋgə/' }
    ],
    sentence: 'Sing a song.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },

  // --- Approximants (Semivowels/Liquids) ---
  {
    symbol: 'l',
    name: 'l',
    section: 'Consonants',
    category: 'Approximants',
    voicing: 'Voiced',
    exampleWord: 'leg',
    sound: 'lll',
    description: 'Alveolar lateral approximant.',
    chineseTip: '【像拼音 l】但词尾时（Dark L）要舌尖抵上齿龈，喉咙发声，像“偶”。',
    commonSpellings: ['l', 'll'],
    examples: [
      { word: 'leg', transcription: '/leg/' },
      { word: 'love', transcription: '/lʌv/' },
      { word: 'ball', transcription: '/bɔːl/' }
    ],
    sentence: 'Lily likes lemons.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'w',
    name: 'w',
    section: 'Consonants',
    category: 'Approximants',
    voicing: 'Voiced',
    exampleWord: 'wet',
    sound: 'wuh',
    description: 'Labio-velar approximant.',
    chineseTip: '【像拼音 w】双唇收小圆孔向前突出，像“我”。',
    commonSpellings: ['w', 'wh'],
    examples: [
      { word: 'wet', transcription: '/wet/' },
      { word: 'win', transcription: '/wɪn/' },
      { word: 'what', transcription: '/wɒt/' }
    ],
    sentence: 'We went west.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  },
  {
    symbol: 'j',
    name: 'y',
    section: 'Consonants',
    category: 'Approximants',
    voicing: 'Voiced',
    exampleWord: 'yes',
    sound: 'yuh',
    description: 'Palatal approximant.',
    chineseTip: '【像拼音 y】像“爷”的声母。注意符号是 j 不是 y！',
    commonSpellings: ['y', 'u'],
    examples: [
      { word: 'yes', transcription: '/jes/' },
      { word: 'yellow', transcription: '/ˈjeləʊ/' },
      { word: 'you', transcription: '/juː/' }
    ],
    sentence: 'You are young.',
    youtubeId: SHARED_VIDEO_ID,
    videoStartTime: 0
  }
];
