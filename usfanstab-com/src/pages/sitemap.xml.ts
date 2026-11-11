import {locales,origin,response} from '../lib/sitemap';
export const GET=()=>response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+locales.map(l=>'<sitemap><loc>'+origin+'/sitemap-'+l+'.xml</loc></sitemap>').join('')+'</sitemapindex>');
