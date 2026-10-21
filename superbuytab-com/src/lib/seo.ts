const translations=import.meta.glob('./seo-copy/*.json',{eager:true,import:'default'}) as Record<string,Record<string,string>>;
export const seoCopy=(lang:string):Record<string,string>=>translations[`./seo-copy/${lang}.json`];
export const categoryPages={
 shoes:{key:'shoes',article:'superbuy-sneakers-spreadsheet'},
 'hoodies-sweaters':{key:'hoodies',article:'superbuy-hoodies-spreadsheet'}
};
export const categoryPaths=Object.keys(categoryPages).map(slug=>`/categories/${slug}/`);
