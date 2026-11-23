import fs from 'node:fs';
import path from 'node:path';

export function loadEditorial(root) {
  const out = {};
  const references = JSON.parse(fs.readFileSync(path.join(root, 'sources.json'), 'utf8'));
  for (const locale of fs.readdirSync(root, {withFileTypes: true}).filter(x => x.isDirectory())) {
    const folder = path.join(root, locale.name);
    const faqPath = path.join(folder, 'faq.json');
    const faq = fs.existsSync(faqPath) ? JSON.parse(fs.readFileSync(faqPath, 'utf8')) : [];
    const articles = {};
    for (const name of fs.readdirSync(folder).filter(n => n.endsWith('.md')).sort()) {
      const slug = name.slice(0, -3);
      if (!/^[a-z0-9-]+$/.test(slug) || !references[slug]?.length) throw Error('Missing article references: '+name);
      const lines = fs.readFileSync(path.join(folder, name), 'utf8').trim().split(/\r?\n/);
      const titleLine = lines.shift();
      if (!titleLine.startsWith('# ')) throw Error('Missing article heading: '+name);
      const intro = [];
      const sections = [];
      for (const line of lines.map(x=>x.trim()).filter(Boolean)) {
        if (line.startsWith('## ')) sections.push({heading:line.slice(3), paragraphs:[]});
        else (sections.at(-1)?.paragraphs ?? intro).push(line);
      }
      if (!intro.length || !sections.length || sections.some(x=>!x.paragraphs.length)) throw Error('Incomplete article: '+name);
      articles[slug] = {title:titleLine.slice(2), intro, sections, sources:references[slug]};
    }
    out[locale.name] = {faq, articles};
  }
  return out;
}
