import content from './content/en.json';
import translations from './content/locales.json';

const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const escape = value => String(value).replace(/[&<>"']/g, char => entities[char]);
const editionFor = language => language === 'en' ? content : translations[language];

export const editions = ['en', ...Object.keys(translations)];
export const hasEdition = language => editions.includes(language);
export const articleLabel = language => editionFor(language)?.articlesLabel;

export function editorialPaths(language) {
  if (!hasEdition(language)) return [];
  return ['faq/', 'articles/', ...content.articles.map(article => 'articles/' + article.slug + '/')];
}

function structured(data) {
  const json = JSON.stringify({'@context': 'https://schema.org', ...data}).replaceAll('<', '\\u003c');
  return '<script type="application/ld+json">' + json + '</script>';
}

function link(href, label) {
  return '<a href="' + escape(href) + '">' + escape(label) + '</a>';
}

function sourceLabel(address) {
  const url = new URL(address);
  const path = url.pathname.replace(/^\/(en|de)(\/|$)/, '/').replace(/\/$/, '');
  return url.hostname.replace(/^www\./, '') + path;
}

export function editorialPage(language, path, origin) {
  const edition = editionFor(language);
  if (!edition) return null;
  const base = '/' + language + '/';
  const indexPath = base + 'articles/';
  const indexLink = link(indexPath, edition.articlesLabel);

  if (path === 'faq/') {
    const questions = edition.faq.map(([question, answer]) =>
      '<details><summary>' + escape(question) + '</summary><p>' + escape(answer) + '</p></details>'
    ).join('');
    const schema = structured({
      '@type': 'FAQPage',
      inLanguage: language,
      mainEntity: edition.faq.map(([name, answer]) => ({
        '@type': 'Question', name, acceptedAnswer: {'@type': 'Answer', text: answer}
      }))
    });
    return {
      title: edition.faqTitle,
      description: edition.faq[0][0],
      body: '<section class="guide"><h1>' + escape(edition.faqTitle) + '</h1>' +
        questions + '<p>' + indexLink + ' · ' + link('https://ootdbuy.com/helpcenter', 'OOTDBuy') + '</p></section>' + schema
    };
  }

  if (path === 'articles/') {
    const cards = edition.articles.map((article, i) => {
      const href = indexPath + content.articles[i].slug + '/';
      return '<section><h2>' + link(href, article.title) + '</h2><p>' + escape(article.lead) + '</p></section>';
    }).join('');
    return {
      title: edition.indexTitle,
      description: edition.indexDescription,
      body: '<section class="editorial"><h1>' + escape(edition.indexTitle) + '</h1><p>' +
        escape(edition.indexDescription) + '</p>' + cards + '</section>'
    };
  }

  const index = content.articles.findIndex(article => path === 'articles/' + article.slug + '/');
  if (index < 0) return null;
  const article = edition.articles[index];
  const sources = content.articles[index].sources;
  const references = sources.map(source => link(source, sourceLabel(source))).join(' · ');
  const sections = article.sections.map(([heading, ...paragraphs]) =>
    '<section><h2>' + escape(heading) + '</h2>' +
    paragraphs.map(paragraph => '<p>' + escape(paragraph) + '</p>').join('') + '</section>'
  ).join('');
  const schema = structured({
    '@type': 'Article',
    headline: article.title,
    description: article.lead,
    inLanguage: language,
    mainEntityOfPage: origin + base + path,
    citation: sources
  });
  return {
    title: article.title,
    description: article.lead,
    body: '<article class="editorial"><p>' + indexLink + '</p><h1>' + escape(article.title) +
      '</h1><p>' + escape(article.lead) + '</p>' + sections + '<p>' + escape(edition.sourcesLabel) +
      ' · ' + references + '</p><p>' + link(base + 'faq/', edition.faqTitle) + '</p></article>' + schema
  };
}
