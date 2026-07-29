import fs from 'fs';
import { translations } from './translations';

async function translateText(text: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json[0].map((item: any) => item[0]).join('');
  } catch (e) {
    console.error('Error translating:', text, e);
    return text;
  }
}

async function translateToThai() {
  const enTranslations = translations.en;
  const keys = Object.keys(enTranslations);
  const values = Object.values(enTranslations);

  console.log('Translating', keys.length, 'keys...');

  const thTranslations: Record<string, string> = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[i];
    
    // Simple rate limiting
    if (i % 20 === 0) {
      console.log(`Translating ${i}/${keys.length}...`);
      await new Promise(r => setTimeout(r, 1000));
    }

    thTranslations[key] = await translateText(value);
  }

  const thString = JSON.stringify(thTranslations, null, 4).replace(/^\{/m, '  th: {').replace(/\}$/m, '  }');
  
  const translationsFile = fs.readFileSync('./translations.ts', 'utf8');
  const updatedFile = translationsFile.replace(/  \}\n\};\n/m, '  },\n' + thString + '\n};\n');
  
  fs.writeFileSync('./translations.ts', updatedFile);
  console.log('Translation complete!');
}

translateToThai();
