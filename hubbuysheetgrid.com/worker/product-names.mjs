// Whole phrases are translated before individual words. Brand and model identifiers
// are taken from the seller title; routes are used only for the catalog category.
import {translate} from './translation.mjs';
import {localizedDescription} from './locale.mjs';
const sourcePhrases=[
 "women's solid-color briefs","floral camouflage t-shirt and shorts set","casual shoes","unisex graffiti flared pants",
 "autumn and winter casual hoodie","christmas sweater","game machine","fish slides","brand pajamas","new crystal shoes",
 "comfortable lightweight slippers","hip hop bracelet","shoes"
];
const rows={
zh:'女士纯色三角裤|花卉迷彩T恤短裤套装|休闲鞋|中性涂鸦喇叭裤|秋冬休闲连帽卫衣|圣诞毛衣|游戏机|鱼形拖鞋|品牌睡衣|新款水晶鞋|轻便舒适拖鞋|嘻哈手链|鞋履',
de:'Einfarbige Damenslips|Set aus T-Shirt und Shorts mit floralem Tarnmuster|Freizeitschuhe|Unisex-Schlaghose mit Graffiti-Muster|Freizeit-Hoodie für Herbst und Winter|Weihnachtspullover|Spielkonsole|Badeschlappen in Fischform|Markenpyjama|Neue Kristallschuhe|Bequeme leichte Hausschuhe|Hip-Hop-Armband|Schuhe',
fr:'Culotte unie pour femme|Ensemble t-shirt et short à camouflage floral|Chaussures décontractées|Pantalon évasé unisexe à motif graffiti|Sweat à capuche décontracté pour l’automne et l’hiver|Pull de Noël|Console de jeux|Claquettes en forme de poisson|Pyjama de marque|Nouvelles chaussures en cristal|Chaussons légers et confortables|Bracelet hip-hop|Chaussures',
es:'Braguitas lisas de mujer|Conjunto de camiseta y pantalón corto con camuflaje floral|Calzado informal|Pantalones acampanados unisex con grafiti|Sudadera informal con capucha para otoño e invierno|Jersey navideño|Consola de videojuegos|Chanclas con forma de pez|Pijama de marca|Zapatos de cristal nuevos|Zapatillas ligeras y cómodas|Pulsera de hip hop|Calzado',
it:'Slip da donna a tinta unita|Completo con maglietta e pantaloncini mimetici a fiori|Scarpe casual|Pantaloni a zampa unisex con graffiti|Felpa casual con cappuccio per autunno e inverno|Maglione natalizio|Console per videogiochi|Ciabatte a forma di pesce|Pigiama di marca|Nuove scarpe di cristallo|Pantofole comode e leggere|Bracciale hip hop|Scarpe',
nl:'Effen damesslip|T-shirt en short met bloemen- en camouflageprint|Vrijetijdsschoenen|Uniseks uitlopende broek met graffiti|Casual hoodie voor herfst en winter|Kersttrui|Spelcomputer|Badslippers in visvorm|Merkpyjama|Nieuwe kristallen schoenen|Comfortabele lichte pantoffels|Hiphoparmband|Schoenen',
pt:'Cuecas lisas de mulher|Conjunto de camiseta e shorts com camuflagem floral|Calçado casual|Calças unissexo de boca de sino com grafite|Moletom casual com capuz para outono e inverno|Suéter de Natal|Console de jogos|Chinelos em forma de peixe|Pijama de marca|Sapatos de cristal novos|Chinelos leves e confortáveis|Pulseira de hip-hop|Calçado',
pl:'Gładkie figi damskie|Zestaw koszulki i szortów w kwiatowy kamuflaż|Buty codzienne|Spodnie dzwony unisex z graffiti|Codzienna bluza z kapturem na jesień i zimę|Sweter świąteczny|Konsola do gier|Klapki w kształcie ryby|Markowa piżama|Nowe kryształowe buty|Wygodne lekkie kapcie|Bransoletka hiphopowa|Obuwie',
ro:'Chiloți uni pentru femei|Set de tricou și pantaloni scurți cu camuflaj floral|Încălțăminte casual|Pantaloni evazați unisex cu graffiti|Hanorac casual pentru toamnă și iarnă|Pulover de Crăciun|Consolă de jocuri|Papuci în formă de pește|Pijama de marcă|Pantofi noi de cristal|Papuci ușori și comozi|Brățară hip-hop|Încălțăminte',
sv:'Enfärgade damtrosor|T-shirt och shorts med blommigt kamouflagemönster|Fritidsskor|Unisex utsvängda byxor med graffiti|Ledig huvtröja för höst och vinter|Jultröja|Spelkonsol|Badtofflor i fiskform|Märkespyjamas|Nya kristallskor|Bekväma lätta tofflor|Hiphoparmband|Skor',
da:'Ensfarvede dametrusser|T-shirt og shorts med blomstret camouflage|Fritidssko|Unisex trompetbukser med graffiti|Afslappet hættetrøje til efterår og vinter|Julesweater|Spillekonsol|Badesandaler formet som fisk|Mærkepyjamas|Nye krystalsko|Behagelige lette hjemmesko|Hiphoparmbånd|Sko',
fi:'Naisten yksiväriset alushousut|Kukkamaastokuvioinen T-paita ja shortsit|Vapaa-ajan kengät|Unisex-graffitilahjehousut levenevillä lahkeilla|Rento syys- ja talvihuppari|Jouluneule|Pelikonsoli|Kalanmuotoiset sandaalit|Merkkipyjama|Uudet kristallikengät|Mukavat kevyet tohvelit|Hiphop-rannekoru|Kengät',
el:'Μονόχρωμο γυναικείο σλιπ|Σετ μπλούζας και σορτς με φλοράλ παραλλαγή|Καθημερινά παπούτσια|Παντελόνι καμπάνα unisex με γκράφιτι|Καθημερινό φούτερ με κουκούλα για φθινόπωρο και χειμώνα|Χριστουγεννιάτικο πουλόβερ|Κονσόλα παιχνιδιών|Παντόφλες σε σχήμα ψαριού|Πιτζάμες επώνυμης μάρκας|Νέα κρυστάλλινα παπούτσια|Άνετες ελαφριές παντόφλες|Βραχιόλι χιπ χοπ|Παπούτσια',
cs:'Jednobarevné dámské kalhotky|Tričko a šortky s květinovou kamufláží|Volnočasová obuv|Unisex zvonové kalhoty s graffiti|Volnočasová mikina s kapucí na podzim a zimu|Vánoční svetr|Herní konzole|Pantofle ve tvaru ryby|Značkové pyžamo|Nové křišťálové boty|Pohodlné lehké pantofle|Hip-hopový náramek|Obuv',
hu:'Egyszínű női alsónemű|Virágos terepmintás póló és rövidnadrág szett|Szabadidőcipő|Uniszex graffitimintás trapéznadrág|Laza kapucnis pulóver őszre és télre|Karácsonyi pulóver|Játékkonzol|Hal alakú papucs|Márkás pizsama|Új kristálycipő|Kényelmes könnyű papucs|Hiphop karkötő|Cipő',
bg:'Едноцветни дамски бикини|Комплект тениска и шорти с флорален камуфлаж|Ежедневни обувки|Унисекс панталон чарлстон с графити|Ежедневен суитшърт с качулка за есента и зимата|Коледен пуловер|Игрова конзола|Чехли във формата на риба|Маркова пижама|Нови кристални обувки|Удобни леки чехли|Хип-хоп гривна|Обувки',
sk:'Jednofarebné dámske nohavičky|Tričko a šortky s kvetinovou kamuflážou|Voľnočasová obuv|Unisex zvonové nohavice s grafitmi|Voľnočasová mikina s kapucňou na jeseň a zimu|Vianočný sveter|Herná konzola|Šľapky v tvare ryby|Značkové pyžamo|Nové krištáľové topánky|Pohodlné ľahké papuče|Hiphopový náramok|Obuv',
hr:'Jednobojne ženske gaćice|Komplet majice i kratkih hlača s cvjetnom kamuflažom|Ležerne cipele|Uniseks trapez hlače s grafitima|Ležerna majica s kapuljačom za jesen i zimu|Božićni džemper|Igraća konzola|Natikače u obliku ribe|Markirana pidžama|Nove kristalne cipele|Udobne lagane papuče|Hip-hop narukvica|Obuća',
ja:'レディース無地ショーツ|花柄迷彩のTシャツ・ショートパンツセット|カジュアルシューズ|ユニセックスのグラフィティ柄フレアパンツ|秋冬用カジュアルパーカー|クリスマスセーター|ゲーム機|魚型サンダル|ブランドパジャマ|新作クリスタルシューズ|軽量で履き心地のよいスリッパ|ヒップホップブレスレット|シューズ',
ko:'여성용 단색 팬티|플로럴 카무플라주 티셔츠와 반바지 세트|캐주얼화|남녀공용 그래피티 부츠컷 바지|가을·겨울 캐주얼 후드티|크리스마스 스웨터|게임기|물고기 모양 슬리퍼|브랜드 잠옷|신상 크리스털 슈즈|편안하고 가벼운 슬리퍼|힙합 팔찌|신발',
vi:'Quần lót nữ trơn màu|Bộ áo thun và quần short họa tiết rằn ri hoa|Giày thường ngày|Quần ống loe unisex họa tiết graffiti|Áo hoodie dáng thường ngày cho thu đông|Áo len Giáng sinh|Máy chơi game|Dép hình cá|Đồ ngủ hàng hiệu|Giày pha lê mẫu mới|Dép nhẹ và êm|Vòng tay hip hop|Giày',
th:'กางเกงในสตรีสีพื้น|ชุดเสื้อยืดและกางเกงขาสั้นลายพรางดอกไม้|รองเท้าลำลอง|กางเกงขาบานยูนิเซ็กซ์ลายกราฟฟิตี|เสื้อฮู้ดลำลองสำหรับฤดูใบไม้ร่วงและฤดูหนาว|เสื้อสเวตเตอร์คริสต์มาส|เครื่องเล่นเกม|รองเท้าแตะรูปปลา|ชุดนอนแบรนด์|รองเท้าคริสตัลรุ่นใหม่|รองเท้าแตะสวมสบายน้ำหนักเบา|สร้อยข้อมือฮิปฮอป|รองเท้า',
id:'Celana dalam wanita warna polos|Set kaus dan celana pendek motif kamuflase bunga|Sepatu kasual|Celana cutbray uniseks bermotif grafiti|Hoodie kasual untuk musim gugur dan dingin|Sweter Natal|Konsol gim|Sandal berbentuk ikan|Piyama bermerek|Sepatu kristal baru|Sandal ringan dan nyaman|Gelang hiphop|Sepatu'
};
const translations=Object.fromEntries(Object.entries(rows).map(([lang,row])=>[lang,row.split('|')]));
function clean(value){return String(value||'').replace(/&(?:amp;)?#0*39;|&apos;|’/gi,"'").replace(/&amp;/g,'&').replace(/\s+/g,' ').trim()}
export function productName(lang,raw,path){
 const original=clean(raw);if(lang==='en')return original;
 const name=original.replace(/\bwatche\b/gi,'watch').replace(/\bcoinpurse\b/gi,'coin purse').replace(/\bpans$/i,'pants');
 const translated=translations[lang];
 for(const [i,phrase] of sourcePhrases.entries()){
   const pos=name.toLowerCase().indexOf(phrase);
   if(pos<0)continue;
   const remainder=(name.slice(0,pos)+' '+name.slice(pos+phrase.length)).trim();
   if(remainder&&!/^(?:(?=.*\d)[a-z\d-]+|Rimowa|Breitling|Marshall Bluetooth|Bluetooth|USB-C|AP Royal Oak)$/i.test(remainder))continue;
   return [remainder,translated[i]].filter(Boolean).join(' ');
 }
 return localizedDescription(lang,name,path);
}

const equipment = {
 en:'suitcase|watch|headset|mini fan|power cable|power adapter|coin purse',
 zh:'行李箱|腕表|耳机|迷你风扇|电源线|电源适配器|零钱包',de:'Koffer|Armbanduhr|Headset|Miniventilator|Netzkabel|Netzteil|Münzbörse',
 fr:'Valise|Montre|Casque audio|Mini-ventilateur|Câble d’alimentation|Adaptateur secteur|Porte-monnaie',
 es:'Maleta|Reloj|Auriculares|Miniventilador|Cable de alimentación|Adaptador de corriente|Monedero',
 it:'Valigia|Orologio|Cuffie|Mini ventilatore|Cavo di alimentazione|Alimentatore|Portamonete',
 nl:'Koffer|Horloge|Headset|Miniventilator|Voedingskabel|Netadapter|Portemonnee',pt:'Mala de viagem|Relógio|Auscultadores|Miniventilador|Cabo de alimentação|Adaptador de corrente|Porta-moedas',
 pl:'Walizka|Zegarek|Słuchawki|Miniwentylator|Przewód zasilający|Zasilacz|Portmonetka',ro:'Valiză|Ceas|Căști|Miniventilator|Cablu de alimentare|Adaptor de alimentare|Portmoneu',
 sv:'Resväska|Armbandsur|Hörlurar|Minifläkt|Strömkabel|Nätadapter|Börs',da:'Kuffert|Armbåndsur|Høretelefoner|Miniventilator|Strømkabel|Strømforsyning|Pung',
 fi:'Matkalaukku|Rannekello|Kuulokkeet|Minituuletin|Virtajohto|Verkkolaite|Kolikkokukkaro',el:'Βαλίτσα|Ρολόι|Ακουστικά|Μίνι ανεμιστήρας|Καλώδιο τροφοδοσίας|Τροφοδοτικό|Πορτοφόλι κερμάτων',
 cs:'Kufr|Hodinky|Sluchátka|Mini ventilátor|Napájecí kabel|Napájecí adaptér|Peněženka na mince',hu:'Bőrönd|Karóra|Fejhallgató|Mini ventilátor|Tápkábel|Hálózati adapter|Érmetartó',
 bg:'Куфар|Часовник|Слушалки|Мини вентилатор|Захранващ кабел|Захранващ адаптер|Портмоне',sk:'Kufor|Hodinky|Slúchadlá|Mini ventilátor|Napájací kábel|Napájací adaptér|Peňaženka na mince',
 hr:'Kovčeg|Ručni sat|Slušalice|Mini ventilator|Kabel za napajanje|Adapter napajanja|Novčanik za kovanice',ja:'スーツケース|腕時計|ヘッドセット|小型扇風機|電源ケーブル|電源アダプター|小銭入れ',
 ko:'여행 가방|손목시계|헤드셋|미니 선풍기|전원 케이블|전원 어댑터|동전 지갑',vi:'Vali|Đồng hồ|Tai nghe|Quạt mini|Cáp nguồn|Bộ đổi nguồn|Ví đựng xu',
 th:'กระเป๋าเดินทาง|นาฬิกาข้อมือ|หูฟัง|พัดลมขนาดเล็ก|สายไฟ|อะแดปเตอร์จ่ายไฟ|กระเป๋าใส่เหรียญ',id:'Koper|Jam tangan|Headset|Kipas mini|Kabel daya|Adaptor daya|Dompet koin'
};
for(const [locale,row] of Object.entries(translations))row.push(...equipment[locale].split('|'));
sourcePhrases.push(...equipment.en.split('|'));

// Use the same resolver for every surface, including matching-image results.
export async function resolveNames(items,lang){
 const results=items.map(item=>productName(lang,item.name,item.path));
 if(lang==='en')return results;
 const pending=[];
 items.forEach((item,i)=>{
   const original=clean(item.name);
   if(results[i].startsWith('#') || (original.split(/\s+/).length>=7 && !sourcePhrases.some(p=>original.toLowerCase().includes(p)&&original.toLowerCase().replace(p,'').trim().length<8)))pending.push(i);
 });
 if(pending.length){
   const full=await translate(pending.map(i=>clean(items[i].name)),lang,'en',true);
   pending.forEach((i,k)=>{if(full[k])results[i]=full[k]});
 }
 return results;
}
