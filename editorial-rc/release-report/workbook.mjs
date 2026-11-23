import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const [reportDir]=process.argv.slice(2);
const data=JSON.parse(await fs.readFile(path.join(reportDir,'inventory.json'),'utf8'));
const workbook=Workbook.create();
const summary=workbook.worksheets.add('站点汇总');
const details=workbook.worksheets.add('文章与来源');
function formatTable(sheet,rows,end,widths){
 const cells=sheet.getRange('A1:'+end+rows.length);cells.values=rows;
 const header=sheet.getRange('A1:'+end+'1');header.format.fill='#194D48';header.format.font.color='#FFFFFF';header.format.font.bold=true;header.format.rowHeight=30;
 for(const [i,width] of widths.entries()){
   const col=String.fromCharCode(65+i);sheet.getRange(col+':'+col).format.columnWidth=width;
 }
 const body=sheet.getRange('A2:'+end+rows.length);body.format.wrapText=true;body.format.verticalAlignment='center';
 sheet.freezePanes.freezeRows(1);
}
formatTable(summary,data.summary,'F',[25,17,18,52,47,32]);
summary.getRange('A2:F14').format.rowHeight=38;
formatTable(details,data.articles,'M',[23,13,55,80,43,20,43,85,85,50,47,15,32]);
details.getRange('A2:M131').format.rowHeight=108;
const table=details.tables.add('A1:M131',true,'ArticleInventory');table.showBandedRows=true;table.style='TableStyleMedium4';
const range=summary.getRange('A16:F16');range.merge();summary.getRange('A16').values=[['选题来自平台与竞品的公开页面。表中目标词和调研选题均未附搜索量数据。']];range.format.font.italic=true;range.format.font.color='#405B57';range.format.rowHeight=28;
const sum=summary.getRange('A15:F15');sum.values=[['合计',data.summary.slice(1).reduce((n,v)=>n+v[1],0),data.articles.length-1,'','','']];sum.format.font.bold=true;sum.format.fill='#D9ECE8';sum.format.rowHeight=30;
for(const [sheet,range,name] of [[summary,'A1:F16','site-summary'],[details,'A1:E3','article-sample']]){
 const preview=await workbook.render({sheetName:sheet.name,range,scale:1});
 await fs.writeFile(path.join(reportDir,name+'.png'),new Uint8Array(await preview.arrayBuffer()));
}
const result=await SpreadsheetFile.exportXlsx(workbook);await result.save(path.join(reportDir,'13站文章与关键词.xlsx'));
