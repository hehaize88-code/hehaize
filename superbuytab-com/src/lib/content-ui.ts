const rows:Record<string,string>={
en:'Articles|Read article|Official source|Sources checked|26 answers based on Superbuy’s official guides. Check current terms in your account before ordering.',
de:'Artikel|Artikel lesen|Offizielle Quelle|Quellen geprüft|26 Antworten auf Grundlage offizieller Superbuy-Leitfäden. Prüfe vor der Bestellung die aktuellen Kontobedingungen.',
es:'Artículos|Leer artículo|Fuente oficial|Fuentes revisadas|26 respuestas basadas en las guías oficiales de Superbuy. Revisa las condiciones actuales en tu cuenta antes de pedir.',
fr:'Articles|Lire l’article|Source officielle|Sources vérifiées|26 réponses fondées sur les guides officiels de Superbuy. Vérifiez les conditions actuelles de votre compte avant de commander.',
it:'Articoli|Leggi articolo|Fonte ufficiale|Fonti verificate|26 risposte basate sulle guide ufficiali Superbuy. Controlla le condizioni attuali nel tuo account prima di ordinare.',
pl:'Artykuły|Czytaj artykuł|Oficjalne źródło|Źródła sprawdzono|26 odpowiedzi na podstawie oficjalnych poradników Superbuy. Sprawdź aktualne warunki na koncie przed zamówieniem.',
pt:'Artigos|Ler artigo|Fonte oficial|Fontes verificadas|26 respostas baseadas nos guias oficiais Superbuy. Consulte as condições atuais na conta antes de encomendar.',
ro:'Articole|Citește articolul|Sursă oficială|Surse verificate|26 de răspunsuri bazate pe ghidurile oficiale Superbuy. Verifică termenii actuali în cont înainte de comandă.',
sv:'Artiklar|Läs artikeln|Officiell källa|Källor granskade|26 svar baserade på Superbuys officiella guider. Kontrollera aktuella kontovillkor före beställning.',
nl:'Artikelen|Lees artikel|Officiële bron|Bronnen gecontroleerd|26 antwoorden gebaseerd op officiële Superbuy-gidsen. Controleer de actuele accountvoorwaarden vóór bestellen.',
da:'Artikler|Læs artiklen|Officiel kilde|Kilder kontrolleret|26 svar baseret på Superbuys officielle vejledninger. Kontrollér aktuelle kontovilkår før bestilling.',
fi:'Artikkelit|Lue artikkeli|Virallinen lähde|Lähteet tarkistettu|26 vastausta Superbuyn virallisten oppaiden pohjalta. Tarkista tilin nykyiset ehdot ennen tilaamista.',
el:'Άρθρα|Διαβάστε το άρθρο|Επίσημη πηγή|Έλεγχος πηγών|26 απαντήσεις βάσει των επίσημων οδηγών Superbuy. Ελέγξτε τους τρέχοντες όρους στον λογαριασμό πριν παραγγείλετε.',
cs:'Články|Číst článek|Oficiální zdroj|Zdroje ověřeny|26 odpovědí podle oficiálních průvodců Superbuy. Před objednáním ověřte aktuální podmínky v účtu.',
hu:'Cikkek|Cikk olvasása|Hivatalos forrás|Források ellenőrizve|26 válasz a Superbuy hivatalos útmutatói alapján. Rendelés előtt ellenőrizd a fiók aktuális feltételeit.',
bg:'Статии|Прочети статията|Официален източник|Проверени източници|26 отговора според официалните ръководства Superbuy. Проверете текущите условия в профила преди поръчка.',
sk:'Články|Čítať článok|Oficiálny zdroj|Zdroje overené|26 odpovedí podľa oficiálnych príručiek Superbuy. Pred objednaním overte aktuálne podmienky v účte.',
hr:'Članci|Pročitaj članak|Službeni izvor|Izvori provjereni|26 odgovora na temelju službenih vodiča Superbuy. Prije naručivanja provjerite aktualne uvjete računa.',
sl:'Članki|Preberi članek|Uradni vir|Viri preverjeni|26 odgovorov na podlagi uradnih vodnikov Superbuy. Pred naročilom preverite trenutne pogoje računa.',
lt:'Straipsniai|Skaityti straipsnį|Oficialus šaltinis|Šaltiniai patikrinti|26 atsakymai pagal oficialius Superbuy vadovus. Prieš užsakydami patikrinkite dabartines paskyros sąlygas.',
lv:'Raksti|Lasīt rakstu|Oficiālais avots|Avoti pārbaudīti|26 atbildes pēc oficiālajām Superbuy rokasgrāmatām. Pirms pasūtījuma pārbaudiet konta pašreizējos nosacījumus.',
et:'Artiklid|Loe artiklit|Ametlik allikas|Allikad kontrollitud|26 vastust Superbuy ametlike juhendite põhjal. Enne tellimist kontrolli konto kehtivaid tingimusi.',
ga:'Ailt|Léigh an t-alt|Foinse oifigiúil|Foinsí seiceáilte|26 freagra bunaithe ar threoracha oifigiúla Superbuy. Seiceáil coinníollacha reatha do chuntais roimh ordú.',
mt:'Artikli|Aqra l-artiklu|Sors uffiċjali|Sorsi ċċekkjati|26 tweġiba bbażati fuq il-gwidi uffiċjali Superbuy. Iċċekkja l-kundizzjonijiet attwali fil-kont qabel tordna.'
};
const keys=['articles','read','official','checked','faqIntro'];
const baseUI=(lang:string):Record<string,string>=>Object.fromEntries(keys.map((k,i)=>[k,(rows[lang]||rows.en).split('|')[i]]));

const extra=import.meta.glob('./article-ui/*.json',{eager:true,import:'default'}) as Record<string,Record<string,string>>;
export const contentUI=(lang:string):Record<string,string>=>({...baseUI(lang),...extra[`./article-ui/${lang}.json`]});
