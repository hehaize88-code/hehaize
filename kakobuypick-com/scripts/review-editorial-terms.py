"""Reviewed terminology and policy qualifications for locally translated prose."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'src/content/editorial'
labels={
'en':['Articles','Kakobuy guides & articles','How Kakobuy works'],
'de':['Artikel','Kakobuy: Ratgeber und Artikel','So funktioniert Kakobuy'],
'es':['Artículos','Guías y artículos de Kakobuy','Cómo funciona Kakobuy'],
'fr':['Articles','Guides et articles Kakobuy','Comment fonctionne Kakobuy'],
'it':['Articoli','Guide e articoli Kakobuy','Come funziona Kakobuy'],
'pl':['Artykuły','Poradniki i artykuły o Kakobuy','Jak działa Kakobuy'],
'pt':['Artigos','Guias e artigos Kakobuy','Como funciona o Kakobuy'],
'ro':['Articole','Ghiduri și articole Kakobuy','Cum funcționează Kakobuy'],
'sv':['Artiklar','Guider och artiklar om Kakobuy','Så fungerar Kakobuy'],
'nl':['Artikelen','Kakobuy: gidsen en artikelen','Zo werkt Kakobuy'],
'da':['Artikler','Guider og artikler om Kakobuy','Sådan fungerer Kakobuy'],
'fi':['Artikkelit','Kakobuy-oppaat ja artikkelit','Näin Kakobuy toimii'],
'el':['Άρθρα','Οδηγοί και άρθρα για το Kakobuy','Πώς λειτουργεί το Kakobuy'],
'cs':['Články','Průvodci a články o Kakobuy','Jak funguje Kakobuy'],
'hu':['Cikkek','Kakobuy útmutatók és cikkek','Így működik a Kakobuy'],
'bg':['Статии','Ръководства и статии за Kakobuy','Как работи Kakobuy'],
'sk':['Články','Sprievodcovia a články o Kakobuy','Ako funguje Kakobuy'],
'hr':['Članci','Vodiči i članci o Kakobuyu','Kako funkcionira Kakobuy'],
'sl':['Članki','Vodniki in članki o Kakobuyu','Kako deluje Kakobuy'],
'lt':['Straipsniai','Kakobuy vadovai ir straipsniai','Kaip veikia Kakobuy'],
'lv':['Raksti','Kakobuy ceļveži un raksti','Kā darbojas Kakobuy'],
'et':['Artiklid','Kakobuy juhendid ja artiklid','Kuidas Kakobuy töötab'],
'ga':['Ailt','Treoracha agus ailt Kakobuy','Conas a oibríonn Kakobuy'],
'mt':['Artikoli','Gwidi u artikoli dwar Kakobuy','Kif jaħdem Kakobuy']}
# Order: authenticity, returns-window, zero-fee, reference-qc.
reviewed={
'fi':[
'Eivät. Pelkät kuvat eivät todista aitoutta, kestävyyttä tai täydellistä toimintakuntoa. Kakobuyn tarkastussäännöt sulkevat erikoistuotteiden, kuten elektroniikan, aitouden, toimivuuden ja laadun arvioinnin nimenomaisesti vakiotarkastuksen ulkopuolelle.',
'Ei. Viralliset viiden päivän palautusehdot riippuvat myyjän hyväksynnästä, tuotteen kelpoisuudesta, kunnosta ja varastointiin liittyvästä määräajasta. Tietyt tuoteryhmät ja muutetut pakkaukset on rajattu pois. Tarkista tilauksen määräaika heti: 100 päivän säilytys ei tarkoita 100 päivän palautusoikeutta.',
'Ei. Virallisella palvelusivulla mainitaan edelleen tuotteen hinta, kansainvälinen rahti ja ilmoituksiin liittyvät kulut sekä erikseen valittavat palvelut. Muilla ohjesivuilla käytetään osin eri maksunimiä. Tarkista ajantasainen erittely; palvelumaksukampanja ei tarkoita ilmaista toimitusta tai kaiken sisältävää hintaa.',
'Eivät. Ne ovat CnBuyChan toimittamia tuotekuvia vertailua varten. Niiden alkuperää varaston QC-kuvina ei ole vahvistettu. Tarkasta oman Kakobuy-tilauksesi kuvat ennen lähetyspäätöstä.'],
'el':[
'Όχι. Οι φωτογραφίες από μόνες τους δεν αποδεικνύουν γνησιότητα, αντοχή ή πλήρη λειτουργία. Οι κανόνες του Kakobuy εξαιρούν ρητά την αξιολόγηση γνησιότητας, λειτουργικότητας και ποιότητας εξειδικευμένων ειδών, όπως ηλεκτρονικά, από τον συνήθη έλεγχο.',
'Όχι. Οι επίσημοι όροι επιστροφής πέντε ημερών εξαρτώνται από την αποδοχή του πωλητή, την επιλεξιμότητα και κατάσταση του προϊόντος και τον χρόνο μετά την αποθήκευση. Ορισμένες κατηγορίες και τροποποιημένες συσκευασίες εξαιρούνται. Ελέγξτε άμεσα την προθεσμία: αποθήκευση 100 ημερών δεν σημαίνει δικαίωμα επιστροφής 100 ημερών.',
'Όχι. Η επίσημη σελίδα υπηρεσιών εξακολουθεί να αναφέρει κόστος προϊόντος, διεθνή μεταφορικά και έξοδα δήλωσης, μαζί με προαιρετικές υπηρεσίες. Άλλες σελίδες χρησιμοποιούν διαφορετικές ονομασίες χρεώσεων. Ελέγξτε την τρέχουσα προσφορά· μια προώθηση μηδενικής χρέωσης υπηρεσίας δεν σημαίνει δωρεάν παράδοση ή τελική τιμή που περιλαμβάνει τα πάντα.',
'Όχι. Είναι εικόνες αναφοράς προϊόντων από το CnBuyCha. Δεν έχει επιβεβαιωθεί ότι προέρχονται από έλεγχο QC αποθήκης. Εξετάστε τις φωτογραφίες της δικής σας παραγγελίας στο Kakobuy πριν αποφασίσετε την αποστολή.'],
'cs':[
'Ne. Samotné fotografie neprokazují pravost, životnost ani plnou funkčnost. Pravidla Kakobuy výslovně vylučují hodnocení pravosti, funkčnosti a kvality specializovaného zboží, například elektroniky, z rozsahu standardní kontroly.',
'Ne. Oficiální pětidenní pravidla vrácení závisí na souhlasu prodejce, způsobilosti a stavu výrobku i lhůtě po naskladnění. Některé kategorie a změněné obaly jsou vyloučeny. Ihned ověřte lhůtu objednávky: 100 dnů skladování neznamená právo na vrácení po dobu 100 dnů.',
'Ne. Oficiální stránka služeb stále uvádí cenu výrobku, mezinárodní dopravu a náklady související s deklarací i volitelné služby. Jiné stránky používají odlišná označení poplatků. Zkontrolujte aktuální rozpis; akce na servisní poplatek neznamená dopravu zdarma ani cenu zahrnující všechny náklady.',
'Ne. Jde o referenční obrázky výrobků od CnBuyCha. Jejich původ jako skladových QC fotografií nebyl ověřen. Před odesláním zkontrolujte fotografie spojené s vlastní objednávkou v Kakobuy.'],
'hu':[
'Nem. A fényképek önmagukban nem igazolják az eredetiséget, a tartósságot vagy a teljes működőképességet. A Kakobuy szabályai kifejezetten kizárják a speciális termékek, például az elektronika eredetiségének, működésének és minőségének értékelését az alapellenőrzésből.',
'Nem. A hivatalos ötnapos visszaküldési szabályok az eladó elfogadásától, a termék jogosultságától, állapotától és a raktározás utáni határidőtől függnek. Egyes kategóriák és megváltoztatott csomagolások kizártak. Azonnal ellenőrizze a rendelés határidejét: a 100 napos tárolás nem jelent 100 napos visszaküldési jogot.',
'Nem. A hivatalos szolgáltatási oldal továbbra is felsorolja a termék árát, a nemzetközi fuvart és a nyilatkozathoz kapcsolódó költségeket, valamint a választható szolgáltatásokat. Más oldalakon eltérő díjnevek szerepelnek. Az aktuális árajánlatot ellenőrizze; a szolgáltatási díj akciója nem jelent ingyenes szállítást vagy minden költséget tartalmazó árat.',
'Nem. Ezek a CnBuyCha által biztosított referencia-termékképek. Nem ellenőriztük, hogy raktári QC-fotók-e. Feladás előtt a saját Kakobuy-rendeléséhez tartozó fényképeket vizsgálja meg.'],
'bg':[
'Не. Самите снимки не доказват автентичност, издръжливост или пълна изправност. Правилата на Kakobuy изрично изключват оценката на автентичността, функционалността и качеството на специализирани стоки, като електроника, от стандартната проверка.',
'Не. Официалните петдневни правила за връщане зависят от съгласието на продавача, допустимостта и състоянието на продукта и срока след складиране. Някои категории и променени опаковки са изключени. Проверете веднага срока на поръчката: 100 дни съхранение не означават право на връщане за 100 дни.',
'Не. Официалната страница за услуги продължава да посочва цена на продукта, международен превоз и разходи по декларирането, както и допълнителни услуги по избор. Други страници използват различни наименования на таксите. Проверете актуалната оферта; промоция за такса за услуга не означава безплатна доставка или цена с включени всички разходи.',
'Не. Това са референтни продуктови изображения от CnBuyCha. Не е потвърдено, че са складови QC снимки. Преди изпращане прегледайте снимките към собствената си поръчка в Kakobuy.'],
'sk':[
'Nie. Samotné fotografie nepotvrdzujú pravosť, životnosť ani úplnú funkčnosť. Pravidlá Kakobuy výslovne vylučujú posudzovanie pravosti, funkčnosti a kvality špecializovaného tovaru, napríklad elektroniky, zo štandardnej kontroly.',
'Nie. Oficiálne päťdňové podmienky vrátenia závisia od súhlasu predajcu, oprávnenosti a stavu výrobku a lehoty po uskladnení. Niektoré kategórie a zmenené obaly sú vylúčené. Ihneď overte lehotu objednávky: 100 dní skladovania neznamená právo na vrátenie počas 100 dní.',
'Nie. Oficiálna stránka služieb stále uvádza cenu výrobku, medzinárodnú dopravu a náklady spojené s deklaráciou aj voliteľné služby. Iné stránky používajú odlišné označenia poplatkov. Overte aktuálny rozpis; akcia na servisný poplatok neznamená dopravu zadarmo ani cenu zahŕňajúcu všetky náklady.',
'Nie. Ide o referenčné produktové obrázky od CnBuyCha. Ich pôvod ako skladových QC fotografií nebol overený. Pred odoslaním skontrolujte fotografie vlastnej objednávky v Kakobuy.'],
'hr':[
'Ne. Same fotografije ne dokazuju autentičnost, trajnost ni potpunu funkcionalnost. Pravila Kakobuya izričito isključuju procjenu autentičnosti, funkcionalnosti i kvalitete specijalizirane robe, poput elektronike, iz standardnog pregleda.',
'Ne. Službena pravila povrata u roku od pet dana ovise o prihvaćanju prodavatelja, prihvatljivosti i stanju proizvoda te roku nakon skladištenja. Neke kategorije i izmijenjena ambalaža su isključene. Odmah provjerite rok narudžbe: 100 dana skladištenja ne znači pravo na povrat tijekom 100 dana.',
'Ne. Službena stranica usluga i dalje navodi cijenu proizvoda, međunarodni prijevoz i troškove deklariranja te dodatne usluge po izboru. Druge stranice koriste različite nazive naknada. Provjerite aktualnu ponudu; promocija naknade za uslugu ne znači besplatnu dostavu ili cijenu koja uključuje sve troškove.',
'Ne. To su referentne slike proizvoda koje dostavlja CnBuyCha. Nije potvrđeno da potječu iz skladišnog QC pregleda. Prije slanja pregledajte fotografije vlastite narudžbe na Kakobuyu.'],
'sl':[
'Ne. Fotografije same ne dokazujejo pristnosti, trajnosti ali popolnega delovanja. Pravila Kakobuy iz standardnega pregleda izrecno izključujejo oceno pristnosti, delovanja in kakovosti specializiranega blaga, kot je elektronika.',
'Ne. Uradna petdnevna pravila vračila so odvisna od soglasja prodajalca, upravičenosti in stanja izdelka ter roka po skladiščenju. Nekatere kategorije in spremenjena embalaža so izključene. Takoj preverite rok naročila: 100 dni skladiščenja ne pomeni pravice do vračila v 100 dneh.',
'Ne. Uradna stran storitev še vedno navaja ceno izdelka, mednarodni prevoz in stroške deklaracije ter izbirne dodatne storitve. Druge strani uporabljajo različna imena pristojbin. Preverite trenutno ponudbo; promocija storitvene pristojbine ne pomeni brezplačne dostave ali cene z vsemi vključenimi stroški.',
'Ne. To so referenčne slike izdelkov, ki jih zagotavlja CnBuyCha. Njihov izvor kot skladiščnih QC fotografij ni potrjen. Pred pošiljanjem preglejte fotografije svojega naročila v Kakobuy.'],
'lt':[
'Ne. Vien nuotraukos neįrodo autentiškumo, ilgaamžiškumo ar visiško veikimo. Kakobuy tikrinimo taisyklės aiškiai neįtraukia specializuotų prekių, pavyzdžiui, elektronikos, autentiškumo, funkcionalumo ir kokybės vertinimo į standartinę patikrą.',
'Ne. Oficialios penkių dienų grąžinimo taisyklės priklauso nuo pardavėjo sutikimo, prekės tinkamumo, būklės ir termino po priėmimo į sandėlį. Kai kurios kategorijos ir pakeistos pakuotės neįtraukiamos. Nedelsdami patikrinkite užsakymo terminą: 100 dienų saugojimas nesuteikia teisės grąžinti per 100 dienų.',
'Ne. Oficialiame paslaugų puslapyje vis tiek nurodomos prekės, tarptautinio transporto ir deklaravimo išlaidos bei pasirenkamos paslaugos. Kituose puslapiuose kai kurie mokesčiai vadinami kitaip. Tikrinkite dabartinį pasiūlymą; paslaugos mokesčio akcija nereiškia nemokamo pristatymo ar kainos, apimančios visas išlaidas.',
'Ne. Tai CnBuyCha pateiktos informacinės produktų nuotraukos. Nepatvirtinta, kad jos yra sandėlio QC nuotraukos. Prieš siųsdami peržiūrėkite savo užsakymo nuotraukas Kakobuy paskyroje.'],
'lv':[
'Nē. Fotogrāfijas vien nepierāda autentiskumu, izturību vai pilnīgu darbspēju. Kakobuy noteikumi standarta pārbaudē skaidri neiekļauj specializētu preču, piemēram, elektronikas, autentiskuma, funkcionalitātes un kvalitātes novērtējumu.',
'Nē. Oficiālie piecu dienu atgriešanas noteikumi ir atkarīgi no pārdevēja piekrišanas, preces atbilstības, stāvokļa un termiņa pēc ievietošanas noliktavā. Dažas kategorijas un mainīts iepakojums ir izslēgti. Nekavējoties pārbaudiet pasūtījuma termiņu: 100 dienu glabāšana nedod tiesības atgriezt preci 100 dienās.',
'Nē. Oficiālajā pakalpojumu lapā joprojām minēta preces cena, starptautiskais transports un deklarēšanas izmaksas, kā arī izvēles pakalpojumi. Citās lapās maksām izmantoti atšķirīgi nosaukumi. Pārbaudiet aktuālo piedāvājumu; pakalpojuma maksas akcija nenozīmē bezmaksas piegādi vai cenu ar visām izmaksām.',
'Nē. Tie ir CnBuyCha nodrošināti preču atsauces attēli. Nav apstiprināts, ka tie ir noliktavas QC fotoattēli. Pirms nosūtīšanas apskatiet sava pasūtījuma fotogrāfijas Kakobuy kontā.'],
'et':[
'Ei. Ainult fotod ei tõenda ehtsust, vastupidavust ega täielikku töökorda. Kakobuy kontrollireeglid välistavad tavakontrollist selgesõnaliselt erikaupade, näiteks elektroonika, ehtsuse, toimivuse ja kvaliteedi hindamise.',
'Ei. Ametlikud viiepäevased tagastusreeglid sõltuvad müüja nõusolekust, toote sobivusest, seisukorrast ja tähtajast pärast lattu võtmist. Mõned kategooriad ja muudetud pakendid on välistatud. Kontrollige tellimuse tähtaega kohe: 100 päeva hoiustamist ei anna 100-päevast tagastusõigust.',
'Ei. Ametlik teenuste leht nimetab endiselt toote hinda, rahvusvahelist vedu ja deklareerimiskulusid ning valikulisi lisateenuseid. Teistel lehtedel kasutatakse mõne tasu kohta teisi nimetusi. Kontrollige praegust hinnapakkumist; teenustasu kampaania ei tähenda tasuta tarnet või kõiki kulusid sisaldavat hinda.',
'Ei. Need on CnBuyCha pakutud toodete võrdluspildid. Nende päritolu lao QC-fotodena ei ole kinnitatud. Enne saatmist vaadake oma Kakobuy tellimuse fotosid.']}
for path in ROOT.glob('*.json'):
 d=json.loads(path.read_text());lang=path.stem
 if lang in labels:
  d['ui']['articles'],d['ui']['articlesTitle'],d['ui']['guideTitle']=labels[lang]
 if lang in reviewed:
  for key,answer in zip(['authenticity','returns-window','zero-fee','reference-qc'],reviewed[lang]):next(f for f in d['faq'] if f['id']==key)['a']=answer
  # These paragraphs state the same policies as the reviewed FAQ answers.
  for index,section,paragraph,key in [(2,1,1,'authenticity'),(9,1,0,'returns-window'),(5,1,0,'zero-fee'),(0,2,1,'reference-qc'),(6,1,0,'storage-normal'),(6,2,0,'storage-unmatched'),(8,1,0,'delivery-time')]:
   text=next(f for f in d['faq'] if f['id']==key)['a']
   if key in ['authenticity','returns-window','zero-fee','reference-qc','storage-unmatched']:text=re.sub(r'^[^.!?]+[.!?]\s+','',text,count=1)
   d['articles'][index]['sections'][section]['paragraphs'][paragraph]=text
 path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print('Applied reviewed navigation labels and policy qualifications')
