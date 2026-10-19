export const targets = {
  production: 'https://superbuytab.com',
  preview: 'https://superbuy-spreadsheet-preview.hehaize88.chatgpt.site'
};
export const isProductionRequest = (url) => url.origin === targets.production;
