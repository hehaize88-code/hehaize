import en from '../content/editorial/en.json';

const modules = import.meta.glob('../content/editorial/*.json', { eager: true, import: 'default' });
export type EditorialContent = typeof en;
export const reviewed = '2026-10-17';
export const sourceURLs: Record<string,string> = {
  buying:'https://kakobuy.com/index/information?information_id=3',
  fees:'https://kakobuy.com/service/help/question?id=63',
  cost:'https://kakobuy.com/service/help/question?id=74',
  payment:'https://kakobuy.com/service/help/question?id=64',
  inspection:'https://kakobuy.com/service/help/question?id=89',
  storage:'https://kakobuy.com/service/help/question?id=1',
  refundTime:'https://kakobuy.com/service/help/question?id=87',
  returns:'https://kakobuy.com/service/help/question?id=51',
  receipt:'https://kakobuy.com/service/help/question?id=54',
  volume:'https://kakobuy.com/service/help/question?id=26&cid=51',
  dispatch:'https://kakobuy.com/service/help/question?id=106&cid=49',
  estimate:'https://kakobuy.com/tools/estimate',
  manual:'https://kakobuy.com/item/notfound',
  help:'https://kakobuy.com/service/help/question',
  catalog:'https://cnbuycha.com/',
  withdrawal:'https://www.kakobuy.com/service/help/question?id=104',
  forwardingInspection:'https://www.kakobuy.com/service/help/question?id=95',
  euJune:'https://www.kakobuy.com/tipdetail?id=51',
  euRoutes:'https://item2.kakobuy.com/tipdetail?id=52'
};
export function contentFor(lang: string): EditorialContent {
  const content=modules[`../content/editorial/${lang}.json`];
  if (!content) throw new Error(`Missing editorial locale: ${lang}`);
  return content as EditorialContent;
}
