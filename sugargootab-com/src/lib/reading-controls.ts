// Small-screen reading controls. Article content itself remains fully rendered.
const labels: Record<string, [string,string]> = {
 en:['Expand all','Collapse all'], de:['Alle aufklappen','Alle zuklappen'],
 es:['Expandir todo','Contraer todo'], fr:['Tout déplier','Tout replier'],
 it:['Espandi tutto','Comprimi tutto'], pl:['Rozwiń wszystko','Zwiń wszystko'],
 pt:['Expandir tudo','Recolher tudo'], ro:['Extinde tot','Restrânge tot'],
 sv:['Visa alla avsnitt','Fäll ihop alla'], nl:['Alles uitklappen','Alles inklappen'],
 da:['Udvid alle','Fold alle sammen'], fi:['Avaa kaikki','Sulje kaikki'],
 el:['Ανάπτυξη όλων','Σύμπτυξη όλων'], cs:['Rozbalit vše','Sbalit vše'],
 hu:['Összes kibontása','Összes összecsukása'], bg:['Разгъни всички','Свий всички'],
 sk:['Rozbaliť všetko','Zbaliť všetko'], hr:['Proširi sve','Sažmi sve'],
 sl:['Razširi vse','Strni vse'], lt:['Išskleisti viską','Suskleisti viską'],
 lv:['Izvērst visu','Sakļaut visu'], et:['Ava kõik','Sulge kõik'],
 ga:['Leathnaigh gach cuid','Laghdaigh gach cuid'], mt:['Espandi kollox','Agħlaq kollox']
};
export const readingControls = (lang:string) => labels[lang];
