const {localProductName, localProductOption, localSourceQuery, prepareProductNames} = (() => {
// Common source-catalog phrases, including actual seller option values.
// A blank cell leaves the source wording intact in that language.
const catalogLanguages = 'nl ro sv da fi el cs hu bg sk hr ja ko vi th id'.split(' ');
const catalogRows = `
accessories|Accessoires|Accesorii|Accessoarer|Tilbehør|Asusteet|Αξεσουάρ|Doplňky|Kiegészítők|Аксесоари|Doplnky|Dodaci|アクセサリー|액세서리|Phụ kiện|เครื่องประดับ|Aksesori
all products|Alle producten|Toate produsele|Alla produkter|Alle produkter|Kaikki tuotteet|Όλα τα προϊόντα|Všechny produkty|Összes termék|Всички продукти|Všetky produkty|Svi proizvodi|すべての商品|모든 상품|Tất cả sản phẩm|สินค้าทั้งหมด|Semua produk
backpack|Rugzakken|Rucsacuri|Ryggsäckar|Rygsække|Reput|Σακίδια|Batohy|Hátizsákok|Раници|Batohy|Ruksaci|リュック|백팩|Ba lô|กระเป๋าเป้|Ransel
backpacks|Rugzakken|Rucsacuri|Ryggsäckar|Rygsække|Reput|Σακίδια|Batohy|Hátizsákok|Раници|Batohy|Ruksaci|リュック|백팩|Ba lô|กระเป๋าเป้|Ransel
bag|Tassen|Genți|Väskor|Tasker|Laukut|Τσάντες|Tašky|Táskák|Чанти|Tašky|Torbe|バッグ|가방|Túi|กระเป๋า|Tas
bags|Tassen|Genți|Väskor|Tasker|Laukut|Τσάντες|Tašky|Táskák|Чанти|Tašky|Torbe|バッグ|가방|Túi|กระเป๋า|Tas
bangle|Armbanden|Brățări|Armband|Armbånd|Rannekorut|Βραχιόλια|Náramky|Karkötők|Гривни|Náramky|Narukvice|ブレスレット|팔찌|Vòng tay|สร้อยข้อมือ|Gelang
beanie|gebreide muts|căciulă|mössa|strikhue|pipo|σκούφος|pletená čepice|kötött sapka|плетена шапка|pletená čiapka|pletena kapa|ニット帽|비니|Mũ len|หมวกไหมพรม|Kupluk
beanies|gebreide muts|căciulă|mössa|strikhue|pipo|σκούφος|pletená čepice|kötött sapka|плетена шапка|pletená čiapka|pletena kapa|ニット帽|비니|Mũ len|หมวกไหมพรม|Kupluk
beige|Beige|Bej|Beige|Beige|Beige|Μπεζ|Béžová|Bézs|Бежово|Béžová|Bež|ベージュ|베이지|Be|เบจ|Krem
belt|Riemen|Curele|Bälten|Bælter|Vyöt|Ζώνες|Pásky|Övek|Колани|Opasky|Remeni|ベルト|벨트|Thắt lưng|เข็มขัด|Ikat pinggang
belts|Riemen|Curele|Bälten|Bælter|Vyöt|Ζώνες|Pásky|Övek|Колани|Opasky|Remeni|ベルト|벨트|Thắt lưng|เข็มขัด|Ikat pinggang
bese quality|Hoge kwaliteit|Calitate superioară|Hög kvalitet|Høj kvalitet|Korkea laatu|Υψηλή ποιότητα|Vysoká kvalita|Kiváló minőség|Високо качество|Vysoká kvalita|Visoka kvaliteta|高品質|고품질|Chất lượng cao|คุณภาพสูง|Kualitas tinggi
best quality|Hoge kwaliteit|Calitate superioară|Hög kvalitet|Høj kvalitet|Korkea laatu|Υψηλή ποιότητα|Vysoká kvalita|Kiváló minőség|Високо качество|Vysoká kvalita|Visoka kvaliteta|高品質|고품질|Chất lượng cao|คุณภาพสูง|Kualitas tinggi
black|Zwart|Negru|Svart|Sort|Musta|Μαύρο|Černá|Fekete|Черно|Čierna|Crna|ブラック|블랙|Đen|ดำ|Hitam
blue|Blauw|Albastru|Blå|Blå|Sininen|Μπλε|Modrá|Kék|Синьо|Modrá|Plava|ブルー|블루|Xanh dương|น้ำเงิน|Biru
bolso|Tassen|Genți|Väskor|Tasker|Laukut|Τσάντες|Tašky|Táskák|Чанти|Tašky|Torbe|バッグ|가방|Túi|กระเป๋า|Tas
bolsos|Tassen|Genți|Väskor|Tasker|Laukut|Τσάντες|Tašky|Táskák|Чанти|Tašky|Torbe|バッグ|가방|Túi|กระเป๋า|Tas
boot|Laarzen|Ghete|Stövlar|Støvler|Saappaat|Μπότες|Kozačky|Csizmák|Ботуши|Čižmy|Čizme|ブーツ|부츠|Bốt|รองเท้าบูท|Sepatu bot
boots|Laarzen|Ghete|Stövlar|Støvler|Saappaat|Μπότες|Kozačky|Csizmák|Ботуши|Čižmy|Čizme|ブーツ|부츠|Bốt|รองเท้าบูท|Sepatu bot
bracelet|Armbanden|Brățări|Armband|Armbånd|Rannekorut|Βραχιόλια|Náramky|Karkötők|Гривни|Náramky|Narukvice|ブレスレット|팔찌|Vòng tay|สร้อยข้อมือ|Gelang
bracelets|Armbanden|Brățări|Armband|Armbånd|Rannekorut|Βραχιόλια|Náramky|Karkötők|Гривни|Náramky|Narukvice|ブレスレット|팔찌|Vòng tay|สร้อยข้อมือ|Gelang
brazalete|Armbanden|Brățări|Armband|Armbånd|Rannekorut|Βραχιόλια|Náramky|Karkötők|Гривни|Náramky|Narukvice|ブレスレット|팔찌|Vòng tay|สร้อยข้อมือ|Gelang
brown|Bruin|Maro|Brun|Brun|Ruskea|Καφέ|Hnědá|Barna|Кафяво|Hnedá|Smeđa|ブラウン|브라운|Nâu|น้ำตาล|Cokelat
camisa|Overhemden|Cămăși|Skjortor|Skjorter|Paidat|Πουκάμισα|Košile|Ingek|Ризи|Košele|Košulje|シャツ|셔츠|Áo sơ mi|เสื้อเชิ้ต|Kemeja
camiseta|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
camisetas|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
cap|Pet|Șapcă|Keps|Kasket|Lippalakki|Καπέλο τζόκεϊ|Kšiltovka|Baseballsapka|Шапка с козирка|Šiltovka|Šilterica|キャップ|캡 모자|Mũ lưỡi trai|หมวกแก๊ป|Topi bisbol
caps|Pet|Șapcă|Keps|Kasket|Lippalakki|Καπέλο τζόκεϊ|Kšiltovka|Baseballsapka|Шапка с козирка|Šiltovka|Šilterica|キャップ|캡 모자|Mũ lưỡi trai|หมวกแก๊ป|Topi bisbol
card holder|Kaarthouder|Suport de carduri|Korthållare|Kortholder|Korttikotelo|Θήκη καρτών|Pouzdro na karty|Kártyatartó|Калъф за карти|Puzdro na karty|Etui za kartice|カードケース|카드 지갑|Ví đựng thẻ|กระเป๋าใส่บัตร|Tempat kartu
cartera|Portemonnees|Portofele|Plånböcker|Punge|Lompakot|Πορτοφόλια|Peněženky|Pénztárcák|Портфейли|Peňaženky|Novčanici|財布|지갑|Ví|กระเป๋าสตางค์|Dompet
casual pants|vrijetijdsbroek|pantaloni casual|fritidsbyxor|fritidsbukser|vapaa-ajan housut|καθημερινό παντελόνι|volnočasové kalhoty|szabadidőnadrág|ежедневен панталон|voľnočasové nohavice|ležerne hlače|カジュアルパンツ|캐주얼 바지|Quần thường ngày|กางเกงลำลอง|Celana kasual
cazadora|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|ジャケット|재킷|Áo khoác|เสื้อแจ็กเก็ต|Jaket
cazadoras|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|ジャケット|재킷|Áo khoác|เสื้อแจ็กเก็ต|Jaket
chaleco|gilet|vestă|väst|vest|liivi|γιλέκο|vesta|mellény|елек|vesta|prsluk|ベスト|조끼|Áo gile|เสื้อกั๊ก|Rompi
chaqueta|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|ジャケット|재킷|Áo khoác|เสื้อแจ็กเก็ต|Jaket
cinturón|Riemen|Curele|Bälten|Bælter|Vyöt|Ζώνες|Pásky|Övek|Колани|Opasky|Remeni|ベルト|벨트|Thắt lưng|เข็มขัด|Ikat pinggang
coat|Mantels|Paltoane|Kappor|Frakker|Päällystakit|Παλτά|Kabáty|Kabátok|Палта|Kabáty|Kaputi|コート|코트|Áo măng tô|เสื้อโค้ท|Mantel
coats|Mantels|Paltoane|Kappor|Frakker|Päällystakit|Παλτά|Kabáty|Kabátok|Палта|Kabáty|Kaputi|コート|코트|Áo măng tô|เสื้อโค้ท|Mantel
color|Kleur|Culoare|Färg|Farve|Väri|Χρώμα|Barva|Szín|Цвят|Farba|Boja|色|색상|Màu|สี|Warna
color scheme|Kleurstelling|Combinație de culori|Färgkombination|Farvekombination|Väriyhdistelmä|Συνδυασμός χρωμάτων|Barevná kombinace|Színösszeállítás|Цветова комбинация|Farebná kombinácia|Kombinacija boja|配色|색상 조합|Phối màu|ชุดสี|Kombinasi warna
colores|kleuren|culori|färger|farver|väriä|χρώματα|barvy|szín|цвята|farby|boje|カラー|색상|Màu sắc|สี|Warna
colors|kleuren|culori|färger|farver|väriä|χρώματα|barvy|szín|цвята|farby|boje|カラー|색상|Màu sắc|สี|Warna
colour|Kleur|Culoare|Färg|Farve|Väri|Χρώμα|Barva|Szín|Цвят|Farba|Boja|色|색상|Màu|สี|Warna
colours||||||||||||カラー|색상|Màu sắc|สี|Warna
cotton|Katoen|Bumbac|Bomull|Bomuld|Puuvilla|Βαμβάκι|Bavlna|Pamut|Памук|Bavlna|Pamuk|コットン|면|Cotton|ผ้าฝ้าย|Katun
cotton fabric|Katoen|Bumbac|Bomull|Bomuld|Puuvilla|Βαμβάκι|Bavlna|Pamut|Памук|Bavlna|Pamuk|コットン|면|Cotton|ผ้าฝ้าย|Katun
crossbody bag|schoudertas|geantă de umăr|axelväska|skuldertaske|olkalaukku|τσάντα ώμου|taška přes rameno|válltáska|чанта за рамо|taška cez rameno|torba za rame|ショルダーバッグ|숄더백|Túi đeo vai|กระเป๋าสะพายไหล่|Tas bahu
dark gray|Donkergrijs|Gri închis|Mörkgrå|Mørkegrå|Tummanharmaa|Σκούρο γκρι|Tmavě šedá|Sötétszürke|Тъмносив|Tmavosivá|Tamnosiva|ダークグレー|진회색|Xám đậm|เทาเข้ม|Abu-abu tua
denim|Denim|Denim|Denim|Denim|Denim|Τζιν ύφασμα|Džínovina|Farmeranyag|Деним|Džínsovina|Traper|デニム|데님|Vải denim|ผ้ายีนส์|Denim
denim jacket|spijkerjack|geacă de blugi|jeansjacka|denimjakke|farkkutakki|τζιν μπουφάν|džínová bunda|farmerdzseki|дънково яке|rifľová bunda|traper jakna|デニムジャケット|데님 재킷|Áo khoác bò|เสื้อแจ็กเก็ตยีนส์|Jaket denim
doll|Speelgoed|Jucării|Leksaker|Legetøj|Lelut|Παιχνίδια|Hračky|Játékok|Играчки|Hračky|Igračke|おもちゃ|장난감|Đồ chơi|ของเล่น|Mainan
dolls|Speelgoed|Jucării|Leksaker|Legetøj|Lelut|Παιχνίδια|Hračky|Játékok|Играчки|Hračky|Igračke|おもちゃ|장난감|Đồ chơi|ของเล่น|Mainan
down coat|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
down jacket|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
down jackets|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
duffel bag|reistas|geantă de voiaj|sportbag|sportstaske|urheilukassi|σακβουαγιάζ|cestovní taška|utazótáska|пътна чанта|cestovná taška|putna torba|ボストンバッグ|더플백|Túi du lịch|กระเป๋าเดินทาง|Tas perjalanan
duffle bag|reistas|geantă de voiaj|sportbag|sportstaske|urheilukassi|σακβουαγιάζ|cestovní taška|utazótáska|пътна чанта|cestovná taška|putna torba|ボストンバッグ|더플백|Túi du lịch|กระเป๋าเดินทาง|Tas perjalanan
earring|Oorbellen|Cercei|Örhängen|Øreringe|Korvakorut|Σκουλαρίκια|Náušnice|Fülbevalók|Обеци|Náušnice|Naušnice|イヤリング|귀걸이|Khuyên tai|ต่างหู|Anting
earrings|Oorbellen|Cercei|Örhängen|Øreringe|Korvakorut|Σκουλαρίκια|Náušnice|Fülbevalók|Обеци|Náušnice|Naušnice|イヤリング|귀걸이|Khuyên tai|ต่างหู|Anting
electronics|Elektronica|Electronice|Elektronik|Elektronik|Elektroniikka|Ηλεκτρονικά|Elektronika|Elektronika|Електроника|Elektronika|Elektronika|電子機器|전자제품|Đồ điện tử|อุปกรณ์อิเล็กทรอนิกส์|Elektronik
estilos|varianten|variante|varianter|varianter|vaihtoehtoa|σχέδια|varianty|változat|варианта|varianty|varijante|種類|가지 스타일|kiểu|แบบ|varian
eyeglasses|Brillen|Ochelari|Glasögon|Briller|Silmälasit|Γυαλιά|Brýle|Szemüvegek|Очила|Okuliare|Naočale|眼鏡|안경|Kính|แว่นตา|Kacamata
fashionable and versatile|modieus en veelzijdig|modern și versatil|modern och mångsidig|moderne og alsidig|muodikas ja monikäyttöinen|μοντέρνο και ευέλικτο|módní a univerzální|divatos és sokoldalú|модерен и универсален|módny a všestranný|moderno i svestrano|おしゃれで合わせやすい|세련되고 활용도 높은|thời trang, dễ phối|ทันสมัยและเข้ากับหลายสไตล์|modis dan serbaguna
football jersey|Voetbalshirt|Tricou de fotbal|Fotbollströja|Fodboldtrøje|Jalkapallopaita|Φανέλα ποδοσφαίρου|Fotbalový dres|Futballmez|Футболна фланелка|Futbalový dres|Nogometni dres|サッカーユニフォーム|축구 유니폼|Áo bóng đá|เสื้อฟุตบอล|Jersey sepak bola
football jerseys|Voetbalshirt|Tricou de fotbal|Fotbollströja|Fodboldtrøje|Jalkapallopaita|Φανέλα ποδοσφαίρου|Fotbalový dres|Futballmez|Футболна фланелка|Futbalový dres|Nogometni dres|サッカーユニフォーム|축구 유니폼|Áo bóng đá|เสื้อฟุตบอล|Jersey sepak bola
for men and women|voor dames en heren|pentru femei și bărbați|för dam och herr|til kvinder og mænd|naisille ja miehille|για άνδρες και γυναίκες|pro muže a ženy|férfiaknak és nőknek|за мъже и жени|pre mužov a ženy|za muškarce i žene|男女兼用|남녀 공용|Dành cho nam và nữ|สำหรับผู้ชายและผู้หญิง|Untuk pria dan wanita
gift box|Geschenkdoos|Cutie cadou|Presentask|Gaveæske|Lahjarasia|Κουτί δώρου|Dárková krabička|Díszdoboz|Подаръчна кутия|Darčeková škatuľka|Darovna kutija|ギフトボックス|선물 상자|Hộp quà|กล่องของขวัญ|Kotak hadiah
glasses|Brillen|Ochelari|Glasögon|Briller|Silmälasit|Γυαλιά|Brýle|Szemüvegek|Очила|Okuliare|Naočale|眼鏡|안경|Kính|แว่นตา|Kacamata
gold|Goud|Auriu|Guld|Guld|Kulta|Χρυσό|Zlatá|Arany|Златист|Zlatá|Zlatna|ゴールド|골드|Vàng kim|ทอง|Emas
gorra|Pet|Șapcă|Keps|Kasket|Lippalakki|Καπέλο τζόκεϊ|Kšiltovka|Baseballsapka|Шапка с козирка|Šiltovka|Šilterica|キャップ|캡 모자|Mũ lưỡi trai|หมวกแก๊ป|Topi bisbol
gray|Grijs|Gri|Grå|Grå|Harmaa|Γκρι|Šedá|Szürke|Сиво|Sivá|Siva|グレー|그레이|Xám|เทา|Abu-abu
green|Groen|Verde|Grön|Grøn|Vihreä|Πράσινο|Zelená|Zöld|Зелено|Zelená|Zelena|グリーン|그린|Xanh lá|เขียว|Hijau
grey|Grijs|Gri|Grå|Grå|Harmaa|Γκρι|Šedá|Szürke|Сиво|Sivá|Siva|グレー|그레이|Xám|เทา|Abu-abu
hat|Hoofddeksels|Pălării și șepci|Huvudbonader|Hovedbeklædning|Päähineet|Καπέλα|Pokrývky hlavy|Fejfedők|Шапки|Pokrývky hlavy|Pokrivala za glavu|帽子|모자|Mũ|หมวก|Topi
hats|Hoofddeksels|Pălării și șepci|Huvudbonader|Hovedbeklædning|Päähineet|Καπέλα|Pokrývky hlavy|Fejfedők|Шапки|Pokrývky hlavy|Pokrivala za glavu|帽子|모자|Mũ|หมวก|Topi
head wear|Hoofddeksels|Articole pentru cap|Huvudbonader|Hovedbeklædning|Päähineet|Καπέλα και σκούφοι|Pokrývky hlavy|Fejfedők|Шапки|Pokrývky hlavy|Pokrivala za glavu|帽子|모자|Mũ|หมวก|Penutup kepala
headwear|Hoofddeksels|Articole pentru cap|Huvudbonader|Hovedbeklædning|Päähineet|Καπέλα και σκούφοι|Pokrývky hlavy|Fejfedők|Шапки|Pokrývky hlavy|Pokrivala za glavu|帽子|모자|Mũ|หมวก|Penutup kepala
high quality|Hoge kwaliteit|Calitate superioară|Hög kvalitet|Høj kvalitet|Korkea laatu|Υψηλή ποιότητα|Vysoká kvalita|Kiváló minőség|Високо качество|Vysoká kvalita|Visoka kvaliteta|高品質|고품질|Chất lượng cao|คุณภาพสูง|Kualitas tinggi
high-quality jacket|hoogwaardig jack|geacă de calitate|jacka av hög kvalitet|jakke af høj kvalitet|laadukas takki|μπουφάν υψηλής ποιότητας|kvalitní bunda|minőségi dzseki|висококачествено яке|kvalitná bunda|kvalitetna jakna|上質なジャケット|고급 재킷|Áo khoác chất lượng cao|เสื้อแจ็กเก็ตคุณภาพสูง|Jaket berkualitas tinggi
hooded jacket|Jas met capuchon|Geacă cu glugă|Huvjacka|Jakke med hætte|Hupullinen takki|Μπουφάν με κουκούλα|Bunda s kapucí|Kapucnis dzseki|Яке с качулка|Bunda s kapucňou|Jakna s kapuljačom|フード付きジャケット|후드 재킷|Áo khoác có mũ|เสื้อแจ็กเก็ตมีฮู้ด|Jaket bertudung
hooded sweatshirt|Hoodies|Hanorace cu glugă|Huvtröjor|Hættetrøjer|Hupparit|Φούτερ με κουκούλα|Mikiny s kapucí|Kapucnis pulóverek|Суитшърти с качулка|Mikiny s kapucňou|Majice s kapuljačom|パーカー|후드티|Áo hoodie|เสื้อฮู้ด|Hoodie
hoodi|Hoodies|Hanorace cu glugă|Huvtröjor|Hættetrøjer|Hupparit|Φούτερ με κουκούλα|Mikiny s kapucí|Kapucnis pulóverek|Суитшърти с качулка|Mikiny s kapucňou|Majice s kapuljačom|パーカー|후드티|Áo hoodie|เสื้อฮู้ด|Hoodie
hoodie|Hoodies|Hanorace cu glugă|Huvtröjor|Hættetrøjer|Hupparit|Φούτερ με κουκούλα|Mikiny s kapucí|Kapucnis pulóverek|Суитшърти с качулка|Mikiny s kapucňou|Majice s kapuljačom|パーカー|후드티|Áo hoodie|เสื้อฮู้ด|Hoodie
hoodies|Hoodies|Hanorace cu glugă|Huvtröjor|Hættetrøjer|Hupparit|Φούτερ με κουκούλα|Mikiny s kapucí|Kapucnis pulóverek|Суитшърти с качулка|Mikiny s kapucňou|Majice s kapuljačom|パーカー|후드티|Áo hoodie|เสื้อฮู้ด|Hoodie
hoodies/sweaters|Hoodies & truien|Pulovere|Hoodies och tröjor|Hætteglas og sweatere|Puvut ja puserot|Ακούσια και πουλόβερ|Svetry a svetry|Takaró és pulóver|Hoodia и пуловери|Mikiny a svetre|Hoodia i džemperi|パーカー・セーター|후드티·스웨터|Áo hoodie và áo len|เสื้อฮู้ดและเสื้อไหมพรม|Hoodie dan sweter
jacket|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|ジャケット|재킷|Áo khoác|เสื้อแจ็กเก็ต|Jaket
jackets|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|ジャケット|재킷|Áo khoác|แจ็กเก็ต|Jaket
jeans|Jeans|Blugi|Jeans|Jeans|Farkut|Τζιν|Džíny|Farmerek|Дънки|Džínsy|Traperice|ジーンズ|청바지|Quần jean|กางเกงยีนส์|Jeans
jersey|Sportshirts|Tricouri sportive|Sporttröjor|Sportstrøjer|Pelipaidat|Αθλητικές φανέλες|Dresy|Mezek|Спортни фланелки|Dresy|Dresovi|ユニフォーム|스포츠 유니폼|Áo đấu|เสื้อกีฬา|Jersey
jerseys|Sportshirts|Tricouri sportive|Sporttröjor|Sportstrøjer|Pelipaidat|Αθλητικές φανέλες|Dresy|Mezek|Спортни фланелки|Dresy|Dresovi|ユニフォーム|스포츠 유니폼|Áo đấu|เสื้อกีฬา|Jersey
jewellery|Sieraden|Bijuterii|Smycken|Smykker|Korut|Κοσμήματα|Šperky|Ékszerek|Бижута|Šperky|Nakit|ジュエリー|주얼리|Trang sức|เครื่องประดับอัญมณี|Perhiasan
jewelry|Sieraden|Bijuterii|Smycken|Smykker|Korut|Κοσμήματα|Šperky|Ékszerek|Бижута|Šperky|Nakit|ジュエリー|주얼리|Trang sức|เครื่องประดับอัญมณี|Perhiasan
joggers|Joggingbroek|Pantaloni de trening|Joggingbyxor|Joggingbukser|Collegehousut|Παντελόνι φόρμας|Tepláky|Melegítőnadrág|Спортно долнище|Tepláky|Donji dio trenirke|ジョガーパンツ|조거 팬츠|Quần thể thao|กางเกงวอร์ม|Celana joger
khaki|Kaki|Kaki|Khaki|Khaki|Khaki|Χακί|Khaki|Khaki|Каки|Khaki|Kaki|カーキ|카키|Kaki|กากี|Khaki
knit|Gebreid|Tricotat|Stickad|Strikket|Neulottu|Πλεκτό|Pletené|Kötött|Плетено|Pletené|Pleteno|ニット|니트|Dệt kim|ผ้าถัก|Rajutan
knitted|Gebreid|Tricotat|Stickad|Strikket|Neulottu|Πλεκτό|Pletené|Kötött|Плетено|Pletené|Pleteno|ニット|니트|Dệt kim|ผ้าถัก|Rajutan
knitted hat|gebreide muts|căciulă|mössa|strikhue|pipo|σκούφος|pletená čepice|kötött sapka|плетена шапка|pletená čiapka|pletena kapa|ニット帽|비니|Mũ len|หมวกไหมพรม|Kupluk
leather|Leer|Piele|Läder|Læder|Nahka|Δέρμα|Kůže|Bőr|Кожа|Koža|Koža|レザー|가죽|Da|หนัง|Kulit
leather wallet|leren portemonnee|portofel din piele|läderplånbok|læderpung|nahkalompakko|δερμάτινο πορτοφόλι|kožená peněženka|bőr pénztárca|кожен портфейл|kožená peňaženka|kožni novčanik|革財布|가죽 지갑|Ví da|กระเป๋าสตางค์หนัง|Dompet kulit
light gray|Lichtgrijs|Gri deschis|Ljusgrå|Lysegrå|Vaaleanharmaa|Ανοιχτό γκρι|Světle šedá|Világosszürke|Светлосив|Svetlosivá|Svijetlosiva|ライトグレー|연회색|Xám nhạt|เทาอ่อน|Abu-abu muda
long sleeves|lange mouwen|cu mâneci lungi|långa ärmar|lange ærmer|pitkät hihat|μακριά μανίκια|dlouhé rukávy|hosszú ujjú|с дълги ръкави|dlhé rukávy|dugi rukavi|長袖|긴소매|tay dài|แขนยาว|lengan panjang
men|Heren|Bărbați|Herr|Herre|Miesten|Ανδρικό|Pánské|Férfi|Мъжки|Pánske|Muški|メンズ|남성용|Nam|ผู้ชาย|Pria
men's|Heren|Bărbați|Herr|Herre|Miesten|Ανδρικό|Pánské|Férfi|Мъжки|Pánske|Muški|メンズ|남성용|Nam|ผู้ชาย|Pria
men’s|Heren|Bărbați|Herr|Herre|Miesten|Ανδρικό|Pánské|Férfi|Мъжки|Pánske|Muški|メンズ|남성용|Nam|ผู้ชาย|Pria
messenger bag|schoudertas|geantă de umăr|axelväska|skuldertaske|olkalaukku|τσάντα ώμου|taška přes rameno|válltáska|чанта за рамо|taška cez rameno|torba za rame|ショルダーバッグ|숄더백|Túi đeo vai|กระเป๋าสะพายไหล่|Tas bahu
models|modellen|modele|modeller|modeller|mallia|μοντέλα|modely|modell|модела|modely|modela|モデル|모델|mẫu|รุ่น|model
navy|Marineblauw|Bleumarin|Marinblå|Marineblå|Laivastonsininen|Μπλε ναυτικό|Námořnická modrá|Tengerészkék|Тъмносин|Námornícka modrá|Tamnoplava|ネイビー|네이비|Xanh hải quân|กรมท่า|Biru dongker
necklace|Kettingen|Coliere|Halsband|Halskæder|Kaulakorut|Κολιέ|Náhrdelníky|Nyakláncok|Колиета|Náhrdelníky|Ogrlice|ネックレス|목걸이|Dây chuyền|สร้อยคอ|Kalung
necklaces|Kettingen|Coliere|Halsband|Halskæder|Kaulakorut|Κολιέ|Náhrdelníky|Nyakláncok|Колиета|Náhrdelníky|Ogrlice|ネックレス|목걸이|Dây chuyền|สร้อยคอ|Kalung
one size|Eén maat|Mărime universală|En storlek|Én størrelse|Yksi koko|Ένα μέγεθος|Univerzální velikost|Egyméretes|Универсален размер|Univerzálna veľkosť|Univerzalna veličina|フリーサイズ|단일 사이즈|Một cỡ|ขนาดเดียว|Satu ukuran
orange|Oranje|Portocaliu|Orange|Orange|Oranssi|Πορτοκαλί|Oranžová|Narancssárga|Оранжево|Oranžová|Narančasta|オレンジ|오렌지|Cam|ส้ม|Oranye
original gift box (quality guaranteed, no returns or exchanges)|Originele geschenkdoos (kwaliteit gegarandeerd, geen retour of omruiling)|Cutie cadou originală (calitate garantată, fără retur sau schimb)|Originalpresentask (garanterad kvalitet, ingen retur eller bytesrätt)|Original gaveæske (garanteret kvalitet, ingen returnering eller ombytning)|Alkuperäinen lahjarasia (laatutakuu, ei palautus- eikä vaihto-oikeutta)|Αυθεντικό κουτί δώρου (εγγυημένη ποιότητα, χωρίς επιστροφές ή αλλαγές)|Originální dárková krabička (zaručená kvalita, bez možnosti vrácení či výměny)|Eredeti díszdoboz (garantált minőség, visszaküldés és csere nélkül)|Оригинална подаръчна кутия (гарантирано качество, без връщане или замяна)|Originálna darčeková škatuľka (zaručená kvalita, bez možnosti vrátenia alebo výmeny)|Izvorna darovna kutija (zajamčena kvaliteta, bez povrata ili zamjene)|純正ギフトボックス（品質保証、返品・交換不可）|정품 선물 상자 (품질 보증, 반품 및 교환 불가)|Hộp quà nguyên bản (bảo đảm chất lượng, không đổi trả)|กล่องของขวัญแท้ (รับประกันคุณภาพ ไม่รับคืนหรือเปลี่ยน)|Kotak hadiah asli (kualitas terjamin, tidak dapat dikembalikan atau ditukar)
other stuff|Overige|Altele|Övrigt|Andet|Muut|Άλλα|Ostatní|Egyéb|Други|Ostatné|Ostalo|その他|기타|Khác|อื่น ๆ|Lainnya
oversized|ruime pasvorm|croială largă|rymlig passform|løs pasform|väljä malli|φαρδιά γραμμή|volný střih|bő szabás|свободна кройка|voľný strih|široki kroj|ゆったりしたシルエット|오버핏|dáng rộng|ทรงหลวม|potongan longgar
pantalones|Broeken|Pantaloni|Byxor|Bukser|Housut|Παντελόνια|Kalhoty|Nadrágok|Панталони|Nohavice|Hlače|パンツ|바지|Quần dài|กางเกงขายาว|Celana panjang
pants|Broeken|Pantaloni|Byxor|Bukser|Housut|Παντελόνια|Kalhoty|Nadrágok|Панталони|Nohavice|Hlače|パンツ|바지|Quần dài|กางเกงขายาว|Celana panjang
pants/shorts|Broeken / Shorts|Pantaloni / Pantaloni scurți|Byxor / Shorts|Bukser / Shorts|Housut / Shortsit|Παντελόνια / Σορτς|Kalhoty / Šortky|Nadrágok / Rövidnadrágok|Панталони / Къси панталони|Nohavice / Šortky|Hlače / Kratke hlače|パンツ / ショートパンツ|바지 / 반바지|Quần dài / Quần short|กางเกงขายาว / กางเกงขาสั้น|Celana panjang / Celana pendek
perfume|Parfum|Parfumuri|Parfym|Parfume|Hajuvedet|Αρώματα|Parfémy|Parfümök|Парфюми|Parfumy|Parfemi|香水|향수|Nước hoa|น้ำหอม|Parfum
perfumes|Parfum|Parfumuri|Parfym|Parfume|Hajuvedet|Αρώματα|Parfémy|Parfümök|Парфюми|Parfumy|Parfemi|香水|향수|Nước hoa|น้ำหอม|Parfum
phone case|Telefoonhoesje|Husă de telefon|Mobilskal|Mobilcover|Puhelinkuori|Θήκη κινητού|Kryt na telefon|Telefontok|Калъф за телефон|Kryt na telefón|Maska za mobitel|スマホケース|휴대폰 케이스|Ốp điện thoại|เคสโทรศัพท์|Casing ponsel
pink|Roze|Roz|Rosa|Lyserød|Vaaleanpunainen|Ροζ|Růžová|Rózsaszín|Розово|Ružová|Ružičasta|ピンク|핑크|Hồng|ชมพู|Merah muda
plaid jacket for men|geruit herenjack|geacă în carouri pentru bărbați|rutig herrjacka|ternet herrejakke|miesten ruututakki|ανδρικό καρό μπουφάν|pánská kostkovaná bunda|férfi kockás dzseki|мъжко карирано яке|pánska károvaná bunda|muška karirana jakna|メンズチェック柄ジャケット|남성용 체크 재킷|Áo khoác kẻ ô nam|เสื้อแจ็กเก็ตลายสก๊อตผู้ชาย|Jaket kotak-kotak pria
polo|poloshirt|tricou polo|pikétröja|polotrøje|poolopaita|μπλούζα πόλο|polokošile|galléros póló|поло тениска|polokošeľa|polo majica|ポロシャツ|폴로 셔츠|Áo polo|เสื้อโปโล|Kaus polo
polo shirt|poloshirt|tricou polo|pikétröja|polotrøje|poolopaita|μπλούζα πόλο|polokošile|galléros póló|поло тениска|polokošeľa|polo majica|ポロシャツ|폴로 셔츠|Áo polo|เสื้อโปโล|Kaus polo
polo shirts|poloshirt|tricou polo|pikétröja|polotrøje|poolopaita|μπλούζα πόλο|polokošile|galléros póló|поло тениска|polokošeľa|polo majica|ポロシャツ|폴로 셔츠|Áo polo|เสื้อโปโล|Kaus polo
print|Bedrukt|Imprimat|Med tryck|Med tryk|Painokuvioitu|Με στάμπα|S potiskem|Nyomott mintás|С принт|S potlačou|S tiskom|プリント|프린트|In họa tiết|ลายพิมพ์|Motif cetak
printed|Bedrukt|Imprimat|Med tryck|Med tryk|Painokuvioitu|Με στάμπα|S potiskem|Nyomott mintás|С принт|S potlačou|S tiskom|プリント|프린트|In họa tiết|ลายพิมพ์|Motif cetak
puffer|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
puffer jacket|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
puffers|donsjack|geacă de puf|dunjacka|dunjakke|untuvatakki|πουπουλένιο μπουφάν|péřová bunda|pehelykabát|пухено яке|páperová bunda|pernata jakna|ダウンジャケット|다운 재킷|Áo khoác lông vũ|เสื้อแจ็กเก็ตขนเป็ด|Jaket bulu angsa
pullover|Truien|Pulovere|Tröjor|Sweatre|Neuleet|Πουλόβερ|Svetry|Kötött pulóverek|Пуловери|Svetre|Džemperi|セーター|스웨터|Áo len|เสื้อไหมพรม|Sweter
purple|Paars|Mov|Lila|Lilla|Violetti|Μωβ|Fialová|Lila|Лилаво|Fialová|Ljubičasta|パープル|퍼플|Tím|ม่วง|Ungu
quilted jacket|Gewatteerde jas|Geacă matlasată|Quiltad jacka|Quiltet jakke|Tikkitakki|Καπιτονέ μπουφάν|Prošívaná bunda|Steppelt dzseki|Капитонирано яке|Prešívaná bunda|Prošivena jakna|キルティングジャケット|퀼팅 재킷|Áo khoác chần bông|เสื้อแจ็กเก็ตบุนวม|Jaket berlapis
red|Rood|Roșu|Röd|Rød|Punainen|Κόκκινο|Červená|Piros|Червено|Červená|Crvena|レッド|레드|Đỏ|แดง|Merah
reloj|Horloges|Ceasuri|Klockor|Ure|Kellot|Ρολόγια|Hodinky|Órák|Часовници|Hodinky|Satovi|腕時計|시계|Đồng hồ|นาฬิกา|Jam tangan
ring|Ringen|Inele|Ringar|Ringe|Sormukset|Δαχτυλίδια|Prsteny|Gyűrűk|Пръстени|Prstene|Prstenje|指輪|반지|Nhẫn|แหวน|Cincin
rings|Ringen|Inele|Ringar|Ringe|Sormukset|Δαχτυλίδια|Prsteny|Gyűrűk|Пръстени|Prstene|Prstenje|指輪|반지|Nhẫn|แหวน|Cincin
running shoes|hardloopschoenen|pantofi de alergare|löparskor|løbesko|juoksukengät|παπούτσια για τρέξιμο|běžecké boty|futócipő|обувки за бягане|bežecké topánky|tenisice za trčanje|ランニングシューズ|러닝화|Giày chạy bộ|รองเท้าวิ่ง|Sepatu lari
sandal|Sandalen|Sandale|Sandaler|Sandaler|Sandaalit|Σανδάλια|Sandály|Szandálok|Сандали|Sandále|Sandale|サンダル|샌들|Xăng đan|รองเท้ารัดส้น|Sandal
sandals|Sandalen|Sandale|Sandaler|Sandaler|Sandaalit|Σανδάλια|Sandály|Szandálok|Сандали|Sandále|Sandale|サンダル|샌들|Xăng đan|รองเท้ารัดส้น|Sandal
scarf|Sjaals|Eșarfe|Halsdukar|Halstørklæder|Huivit|Κασκόλ|Šály|Sálak|Шалове|Šály|Šalovi|マフラー|목도리|Khăn quàng|ผ้าพันคอ|Syal
scarves|Sjaals|Eșarfe|Halsdukar|Halstørklæder|Huivit|Κασκόλ|Šály|Sálak|Шалове|Šály|Šalovi|マフラー|목도리|Khăn quàng|ผ้าพันคอ|Syal
set|Set|Set|Set|Sæt|Setti|Σετ|Souprava|Szett|Комплект|Súprava|Komplet|セット|세트|Bộ|ชุด|Setelan
sets|Set|Set|Set|Sæt|Setti|Σετ|Souprava|Szett|Комплект|Súprava|Komplet|セット|세트|Bộ|ชุด|Setelan
shirt|Overhemden|Cămăși|Skjortor|Skjorter|Paidat|Πουκάμισα|Košile|Ingek|Ризи|Košele|Košulje|シャツ|셔츠|Áo sơ mi|เสื้อเชิ้ต|Kemeja
shirts|Overhemden|Cămăși|Skjortor|Skjorter|Paidat|Πουκάμισα|Košile|Ingek|Ризи|Košele|Košulje|シャツ|셔츠|Áo sơ mi|เสื้อเชิ้ต|Kemeja
shoe|Schoenen|Încălțăminte|Skor|Sko|Kengät|Παπούτσια|Obuv|Cipők|Обувки|Obuv|Obuća|靴|신발|Giày dép|รองเท้า|Sepatu
shoes|Schoenen|Încălțăminte|Skor|Sko|Kengät|Παπούτσια|Obuv|Cipők|Обувки|Obuv|Obuća|靴|신발|Giày dép|รองเท้า|Sepatu
shoes sneakers|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
short|Shorts|Pantaloni scurți|Shorts|Shorts|Shortsit|Σορτς|Šortky|Rövidnadrágok|Къси панталони|Šortky|Kratke hlače|||||
short set|Sets met shorts|Seturi cu pantaloni scurți|Set med shorts|Sæt med shorts|Shortsiasut|Σετ με σορτς|Soupravy se šortkami|Rövidnadrágos szettek|Комплекти с къси панталони|Súpravy so šortkami|Kompleti s kratkim hlačama|ショートパンツのセット|반바지 세트|Bộ đồ quần short|ชุดกางเกงขาสั้น|Setelan celana pendek
short sets|Sets met shorts|Seturi cu pantaloni scurți|Set med shorts|Sæt med shorts|Shortsiasut|Σετ με σορτς|Soupravy se šortkami|Rövidnadrágos szettek|Комплекти с къси панталони|Súpravy so šortkami|Kompleti s kratkim hlačama|ショートパンツのセット|반바지 세트|Bộ đồ quần short|ชุดกางเกงขาสั้น|Setelan celana pendek
short sleeves|korte mouwen|cu mâneci scurte|korta ärmar|korte ærmer|lyhyet hihat|κοντά μανίκια|krátké rukávy|rövid ujjú|с къси ръкави|krátke rukávy|kratki rukavi|半袖|반소매|tay ngắn|แขนสั้น|lengan pendek
shorts|Shorts|Pantaloni scurți|Shorts|Shorts|Shortsit|Σορτς|Šortky|Rövidnadrágok|Къси панталони|Šortky|Kratke hlače|ショートパンツ|반바지|Quần đùi|กางเกงขาสั้น|Celana pendek
shoulder bag|schoudertas|geantă de umăr|axelväska|skuldertaske|olkalaukku|τσάντα ώμου|taška přes rameno|válltáska|чанта за рамо|taška cez rameno|torba za rame|ショルダーバッグ|숄더백|Túi đeo vai|กระเป๋าสะพายไหล่|Tas bahu
silver|Zilver|Argintiu|Silver|Sølv|Hopea|Ασημί|Stříbrná|Ezüst|Сребрист|Strieborná|Srebrna|シルバー|실버|Bạc|เงิน|Perak
size|Maat|Mărime|Storlek|Størrelse|Koko|Μέγεθος|Velikost|Méret|Размер|Veľkosť|Veličina|サイズ|사이즈|Kích cỡ|ขนาด|Ukuran
sleeves|mouwen|mâneci|ärmar|ærmer|hihat|μανίκια|rukávy|ujjak|ръкави|rukávy|rukavi|袖|소매|tay áo|แขนเสื้อ|lengan
slide|Slippers|Papuci|Tofflor|Hjemmesko|Tohvelit|Παντόφλες|Pantofle|Papucsok|Чехли|Papuče|Papuče|スリッパ|슬리퍼|Dép|รองเท้าแตะ|Sandal rumah
slides|Slippers|Papuci|Tofflor|Hjemmesko|Tohvelit|Παντόφλες|Pantofle|Papucsok|Чехли|Papuče|Papuče|スリッパ|슬리퍼|Dép|รองเท้าแตะ|Sandal rumah
slim fit|Aansluitend model|Croi cambrat|Smal passform|Smal pasform|Kapea malli|Στενή γραμμή|Přiléhavý střih|Karcsúsított|Вталена кройка|Priliehavý strih|Uski kroj|スリムフィット|슬림핏|Dáng ôm|ทรงเข้ารูป|Potongan ramping
slipper|Slippers|Papuci|Tofflor|Hjemmesko|Tohvelit|Παντόφλες|Pantofle|Papucsok|Чехли|Papuče|Papuče|スリッパ|슬리퍼|Dép|รองเท้าแตะ|Sandal rumah
slippers|Slippers|Papuci|Tofflor|Hjemmesko|Tohvelit|Παντόφλες|Pantofle|Papucsok|Чехли|Papuče|Papuče|スリッパ|슬리퍼|Dép|รองเท้าแตะ|Sandal rumah
sneaker|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
sneaker shoes|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
sneakers|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
snrakersa|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
soccer jersey|Voetbalshirt|Tricou de fotbal|Fotbollströja|Fodboldtrøje|Jalkapallopaita|Φανέλα ποδοσφαίρου|Fotbalový dres|Futballmez|Футболна фланелка|Futbalový dres|Nogometni dres|サッカーユニフォーム|축구 유니폼|Áo bóng đá|เสื้อฟุตบอล|Jersey sepak bola
sock|Sokken|Șosete|Strumpor|Strømper|Sukat|Κάλτσες|Ponožky|Zoknik|Чорапи|Ponožky|Čarape|靴下|양말|Tất|ถุงเท้า|Kaus kaki
socks|Sokken|Șosete|Strumpor|Strømper|Sukat|Κάλτσες|Ponožky|Zoknik|Чорапи|Ponožky|Čarape|靴下|양말|Tất|ถุงเท้า|Kaus kaki
standard gift box|Standaardgeschenkdoos|Cutie cadou standard|Standardpresentask|Standardgaveæske|Tavallinen lahjarasia|Τυπικό κουτί δώρου|Standardní dárková krabička|Normál díszdoboz|Стандартна подаръчна кутия|Štandardná darčeková škatuľka|Standardna darovna kutija|標準ギフトボックス|기본 선물 상자|Hộp quà tiêu chuẩn|กล่องของขวัญมาตรฐาน|Kotak hadiah standar
standard sizing|Standaardmaatvoering|Mărimi standard|Standardstorlekar|Standardstørrelser|Vakiomitoitus|Τυπικά μεγέθη|Standardní velikosti|Szabványos méretezés|Стандартни размери|Štandardné veľkosti|Standardne veličine|標準サイズ|표준 사이즈|Kích cỡ tiêu chuẩn|ขนาดมาตรฐาน|Ukuran standar
style|Variant|Variantă|Variant|Variant|Malli|Σχέδιο|Varianta|Változat|Вариант|Variant|Varijanta|スタイル|스타일|Kiểu|แบบ|Varian
styles|varianten|variante|varianter|varianter|vaihtoehtoa|σχέδια|varianty|változat|варианта|varianty|varijante|種類|가지 스타일|kiểu|แบบ|varian
styles available|Variant|Variantă|Variant|Variant|Malli|Σχέδιο|Varianta|Változat|Вариант|Variant|Varijanta|スタイル|스타일|Kiểu|แบบ|Varian
stylish and warm outerwear|stijlvolle en warme bovenkleding|îmbrăcăminte elegantă și călduroasă|snygga och varma ytterkläder|stilfuldt og varmt overtøj|tyylikäs ja lämmin ulkovaate|κομψό και ζεστό πανωφόρι|stylové a teplé svrchní oblečení|stílusos és meleg felsőruházat|стилна и топла връхна дреха|štýlové a teplé vrchné oblečenie|moderna i topla gornja odjeća|暖かくおしゃれなアウター|따뜻하고 세련된 아우터|Áo khoác ấm và thời trang|เสื้อคลุมกันหนาวมีสไตล์|Pakaian luar hangat dan bergaya
sudadera|Sweatshirts|Bluze sport|Sweatshirts|Sweatshirts|Collegepaidat|Φούτερ|Mikiny|Pulóverek|Суитшърти|Mikiny|Dukserice|スウェット|맨투맨|Áo nỉ|เสื้อสเวตเชิ้ต|Sweatshirt
sudaderas|Sweatshirts|Bluze sport|Sweatshirts|Sweatshirts|Collegepaidat|Φούτερ|Mikiny|Pulóverek|Суитшърти|Mikiny|Dukserice|スウェット|맨투맨|Áo nỉ|เสื้อสเวตเชิ้ต|Sweatshirt
suit|Set|Set|Set|Sæt|Setti|Σετ|Souprava|Szett|Комплект|Súprava|Komplet|セット|세트|Bộ|ชุด|Setelan
suits|Set|Set|Set|Sæt|Setti|Σετ|Souprava|Szett|Комплект|Súprava|Komplet|セット|세트|Bộ|ชุด|Setelan
sunglass|Zonnebril|Ochelari de soare|Solglasögon|Solbriller|Aurinkolasit|Γυαλιά ηλίου|Sluneční brýle|Napszemüveg|Слънчеви очила|Slnečné okuliare|Sunčane naočale|サングラス|선글라스|Kính râm|แว่นกันแดด|Kacamata hitam
sunglasses|Zonnebril|Ochelari de soare|Solglasögon|Solbriller|Aurinkolasit|Γυαλιά ηλίου|Sluneční brýle|Napszemüveg|Слънчеви очила|Slnečné okuliare|Sunčane naočale|サングラス|선글라스|Kính râm|แว่นกันแดด|Kacamata hitam
sweater|Truien|Pulovere|Tröjor|Sweatre|Neuleet|Πουλόβερ|Svetry|Kötött pulóverek|Пуловери|Svetre|Džemperi|セーター|스웨터|Áo len|เสื้อไหมพรม|Sweter
sweaters|Truien|Pulovere|Tröjor|Sweatre|Neuleet|Πουλόβερ|Svetry|Kötött pulóverek|Пуловери|Svetre|Džemperi|セーター|스웨터|Áo len|เสื้อไหมพรม|Sweter
sweatpants|Joggingbroek|Pantaloni de trening|Joggingbyxor|Joggingbukser|Collegehousut|Παντελόνι φόρμας|Tepláky|Melegítőnadrág|Спортно долнище|Tepláky|Donji dio trenirke|ジョガーパンツ|조거 팬츠|Quần thể thao|กางเกงวอร์ม|Celana joger
sweatshirt|Sweatshirts|Bluze sport|Sweatshirts|Sweatshirts|Collegepaidat|Φούτερ|Mikiny|Pulóverek|Суитшърти|Mikiny|Dukserice|スウェット|맨투맨|Áo nỉ|เสื้อสเวตเชิ้ต|Sweatshirt
sweatshirts|Sweatshirts|Bluze sport|Sweatshirts|Sweatshirts|Collegepaidat|Φούτερ|Mikiny|Pulóverek|Суитшърти|Mikiny|Dukserice|スウェット|맨투맨|Áo nỉ|เสื้อสเวตเชิ้ต|Sweatshirt
sweatsirt|Sweatshirts|Bluze sport|Sweatshirts|Sweatshirts|Collegepaidat|Φούτερ|Mikiny|Pulóverek|Суитшърти|Mikiny|Dukserice|スウェット|맨투맨|Áo nỉ|เสื้อสเวตเชิ้ต|Sweatshirt
t shirt|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
t shirts|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
t-shir|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
t-shirt|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
t-shirts|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
t-sirt|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
tee|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
tees|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
toy|Speelgoed|Jucării|Leksaker|Legetøj|Lelut|Παιχνίδια|Hračky|Játékok|Играчки|Hračky|Igračke|おもちゃ|장난감|Đồ chơi|ของเล่น|Mainan
toys|Speelgoed|Jucării|Leksaker|Legetøj|Lelut|Παιχνίδια|Hračky|Játékok|Играчки|Hračky|Igračke|おもちゃ|장난감|Đồ chơi|ของเล่น|Mainan
trainer|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
trainers|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
trousers|Broeken|Pantaloni|Byxor|Bukser|Housut|Παντελόνια|Kalhoty|Nadrágok|Панталони|Nohavice|Hlače|パンツ|바지|Quần dài|กางเกงขายาว|Celana panjang
tshirt|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
tshirts|T-shirts|Tricouri|T-shirts|T-shirts|T-paidat|Κοντομάνικα|Trička|Pólók|Тениски|Tričká|Majice kratkih rukava|Tシャツ|티셔츠|Áo thun|เสื้อยืด|Kaos
underpants|Ondergoed|Lenjerie|Underkläder|Undertøj|Alusvaatteet|Εσώρουχα|Spodní prádlo|Fehérnemű|Бельо|Spodná bielizeň|Donje rublje|下着|속옷|Đồ lót|ชุดชั้นใน|Pakaian dalam
underwear|Ondergoed|Lenjerie|Underkläder|Undertøj|Alusvaatteet|Εσώρουχα|Spodní prádlo|Fehérnemű|Бельо|Spodná bielizeň|Donje rublje|下着|속옷|Đồ lót|ชุดชั้นใน|Pakaian dalam
various top brands|diverse topmerken|diverse mărci de top|flera ledande märken|forskellige førende mærker|eri huippumerkkejä|διάφορες κορυφαίες μάρκες|různé přední značky|különböző élvonalbeli márkák|различни водещи марки|rôzne popredné značky|razne vodeće marke|人気ブランド各種|다양한 인기 브랜드|nhiều thương hiệu hàng đầu|หลากหลายแบรนด์ชั้นนำ|beragam merek terkemuka
vest|gilet|vestă|väst|vest|liivi|γιλέκο|vesta|mellény|елек|vesta|prsluk|ベスト|조끼|Áo gile|เสื้อกั๊ก|Rompi
vests|gilet|vestă|väst|vest|liivi|γιλέκο|vesta|mellény|елек|vesta|prsluk|ベスト|조끼|Áo gile|เสื้อกั๊ก|Rompi
walle|Portemonnees|Portofele|Plånböcker|Punge|Lompakot|Πορτοφόλια|Peněženky|Pénztárcák|Портфейли|Peňaženky|Novčanici|財布|지갑|Ví|กระเป๋าสตางค์|Dompet
wallet|Portemonnees|Portofele|Plånböcker|Punge|Lompakot|Πορτοφόλια|Peněženky|Pénztárcák|Портфейли|Peňaženky|Novčanici|財布|지갑|Ví|กระเป๋าสตางค์|Dompet
wallets|Portemonnees|Portofele|Plånböcker|Punge|Lompakot|Πορτοφόλια|Peněženky|Pénztárcák|Портфейли|Peňaženky|Novčanici|財布|지갑|Ví|กระเป๋าสตางค์|Dompet
washed|gewassen|prespălat|tvättad|vasket|pesty|πλυμένο|opraný vzhled|mosott|с изпран ефект|opraný vzhľad|isprano|ウォッシュ加工|워싱 가공|xử lý giặt|ผ่านการฟอก|efek pudar
watch|Horloges|Ceasuri|Klockor|Ure|Kellot|Ρολόγια|Hodinky|Órák|Часовници|Hodinky|Satovi|腕時計|시계|Đồng hồ|นาฬิกา|Jam tangan
watches|Horloges|Ceasuri|Klockor|Ure|Kellot|Ρολόγια|Hodinky|Órák|Часовници|Hodinky|Satovi|腕時計|시계|Đồng hồ|นาฬิกา|Jam tangan
waterproof automatic ring watch|waterbestendig automatisch ringhorloge|ceas-inel automat rezistent la apă|vattentålig automatisk ringklocka|vandtæt automatisk ringur|vedenkestävä automaattinen sormuskello|αδιάβροχο αυτόματο ρολόι δαχτυλίδι|vodotěsné automatické prstýnkové hodinky|vízálló automata gyűrűóra|водоустойчив автоматичен часовник пръстен|vodotesné automatické prsteňové hodinky|vodootporni automatski sat u obliku prstena|防水自動巻きリングウォッチ|방수 자동 반지 시계|đồng hồ nhẫn tự động chống nước|นาฬิกาแหวนอัตโนมัติกันน้ำ|jam cincin otomatis tahan air
white|Wit|Alb|Vit|Hvid|Valkoinen|Λευκό|Bílá|Fehér|Бяло|Biela|Bijela|ホワイト|화이트|Trắng|ขาว|Putih
wind breaker|Windjack|Geacă de vânt|Vindjacka|Vindjakke|Tuulitakki|Αντιανεμικό|Větrovka|Széldzseki|Ветровка|Vetrovka|Vjetrovka|ウインドブレーカー|바람막이|Áo khoác gió|เสื้อกันลม|Jaket angin
windbreaker|Windjack|Geacă de vânt|Vindjacka|Vindjakke|Tuulitakki|Αντιανεμικό|Větrovka|Széldzseki|Ветровка|Vetrovka|Vjetrovka|ウインドブレーカー|바람막이|Áo khoác gió|เสื้อกันลม|Jaket angin
windbreakers|Jassen|Jachete|Jackor|Jakker|Takit|Μπουφάν|Bundy|Dzsekik|Якета|Bundy|Jakne|||||
without a gift box|Zonder geschenkdoos|Fără cutie cadou|Utan presentask|Uden gaveæske|Ilman lahjarasiaa|Χωρίς κουτί δώρου|Bez dárkové krabičky|Díszdoboz nélkül|Без подаръчна кутия|Bez darčekovej škatuľky|Bez darovne kutije|ギフトボックスなし|선물 상자 없음|Không kèm hộp quà|ไม่มีกล่องของขวัญ|Tanpa kotak hadiah
women|Dames|Femei|Dam|Dame|Naisten|Γυναικείο|Dámské|Női|Дамски|Dámske|Ženski|レディース|여성용|Nữ|ผู้หญิง|Wanita
women's|Dames|Femei|Dam|Dame|Naisten|Γυναικείο|Dámské|Női|Дамски|Dámske|Ženski|レディース|여성용|Nữ|ผู้หญิง|Wanita
women’s|Dames|Femei|Dam|Dame|Naisten|Γυναικείο|Dámské|Női|Дамски|Dámske|Ženski|レディース|여성용|Nữ|ผู้หญิง|Wanita
yellow|Geel|Galben|Gul|Gul|Keltainen|Κίτρινο|Žlutá|Sárga|Жълто|Žltá|Žuta|イエロー|옐로|Vàng|เหลือง|Kuning
zapatillas|Sneakers|Pantofi sport|Sneakers|Sneakers|Lenkkarit|Αθλητικά παπούτσια|Tenisky|Sportcipők|Маратонки|Tenisky|Tenisice|スニーカー|운동화|Giày thể thao|รองเท้าผ้าใบ|Sepatu kets
zapatos|Schoenen|Încălțăminte|Skor|Sko|Kengät|Παπούτσια|Obuv|Cipők|Обувки|Obuv|Obuća|靴|신발|Giày dép|รองเท้า|Sepatu
zip up|Met ritssluiting|Cu fermoar|Med dragkedja|Med lynlås|Vetoketjullinen|Με φερμουάρ|Na zip|Cipzáras|С цип|Na zips|S patentnim zatvaračem|ジップアップ|집업|Khóa kéo|แบบรูดซิป|Ritsleting
zip-up|Met ritssluiting|Cu fermoar|Med dragkedja|Med lynlås|Vetoketjullinen|Με φερμουάρ|Na zip|Cipzáras|С цип|Na zips|S patentnim zatvaračem|ジップアップ|집업|Khóa kéo|แบบรูดซิป|Ritsleting
`.trim().split('\n');
const catalogWords = Object.fromEntries(catalogLanguages.map(code => [code, new Map()]));
for (const row of catalogRows) {
  const [source, ...translations] = row.split('|');
  translations.forEach((value,index) => {
    if(value) catalogWords[catalogLanguages[index]].set(source,value);
  });
}

const terms = [
 ['All Products','Alle Artikel','Todos los artículos','Tous les articles','Tutti i prodotti','Wszystkie produkty','Todos os produtos','全部商品'],
 ['Hoodies/Sweaters','Hoodies/Pullover','Sudaderas/Jerséis','Sweats à capuche/Pulls','Felpe con cappuccio/Maglioni','Bluzy z kapturem/Swetry','Moletons/Suéteres','连帽衫/毛衣'],
 ['Pants/Shorts','Hosen/Shorts','Pantalones/Pantalones cortos','Pantalons/Shorts','Pantaloni/Pantaloncini','Spodnie/Szorty','Calças/Shorts','长裤/短裤'],
 ['Other Stuff','Sonstiges','Otros artículos','Autres articles','Altri articoli','Pozostałe produkty','Outros produtos','其他商品'],
 ['Short Sets','Sommersets','Conjuntos cortos','Ensembles courts','Completi corti','Komplety letnie','Conjuntos curtos','短装套装'],
 ['T-Shirts','T-Shirts','Camisetas','T-shirts','Magliette','Koszulki','Camisetas','T恤'],
 ['Sweatshirts','Sweatshirts','Sudaderas','Sweats','Felpe','Bluzy','Moletons','卫衣'],
 ['Hoodies','Kapuzenpullover','Sudaderas con capucha','Sweats à capuche','Felpe con cappuccio','Bluzy z kapturem','Moletons com capuz','连帽衫'],
 ['Sweaters','Pullover','Jerséis','Pulls','Maglioni','Swetry','Suéteres','毛衣'],
 ['Jackets','Jacken','Chaquetas','Vestes','Giacche','Kurtki','Jaquetas','夹克'],
 ['Shoes','Schuhe','Zapatos','Chaussures','Scarpe','Buty','Calçados','鞋子'],
 ['Headwear','Kopfbedeckungen','Gorras y sombreros','Couvre-chefs','Copricapi','Nakrycia głowy','Bonés e chapéus','帽饰'],
 ['Accessories','Accessoires','Accesorios','Accessoires','Accessori','Akcesoria','Acessórios','配饰'],
 ['Electronics','Elektronik','Electrónica','Électronique','Elettronica','Elektronika','Eletrônicos','电子产品'],
 ['Jersey','Trikots','Camisetas deportivas','Maillots','Maglie sportive','Koszulki sportowe','Camisas esportivas','球衣'],
 ['Shorts','Shorts','Pantalones cortos','Shorts','Pantaloncini','Szorty','Shorts','短裤'],
 ['Pants','Hosen','Pantalones','Pantalons','Pantaloni','Spodnie','Calças','长裤'],
 ['Bags','Taschen','Bolsos','Sacs','Borse','Torby','Bolsas','包袋'],
 ['Wallets','Geldbörsen','Carteras','Portefeuilles','Portafogli','Portfele','Carteiras','钱包'],
 ['Sneakers','Sneaker','Zapatillas','Baskets','Sneakers','Sneakersy','Tênis','运动鞋'],
 ['Socks','Socken','Calcetines','Chaussettes','Calze','Skarpety','Meias','袜子'],
 ['Watches','Uhren','Relojes','Montres','Orologi','Zegarki','Relógios','手表'],
 ['Jewelry','Schmuck','Joyas','Bijoux','Gioielli','Biżuteria','Joias','首饰']
];
const codes = ['en','de','es','fr','it','pl','pt','zh',...catalogLanguages];
for (const row of terms) {
  for (const code of catalogLanguages) row.push(catalogWords[code].get(row[0].toLowerCase()) || row[0]);
}
const titleRows = `
closed-toe roman sandals|Closed-toe Roman sandals|Geschlossene Römersandalen|Sandalias romanas de punta cerrada|Spartiates à bout fermé|Sandali alla romana a punta chiusa|Sandały rzymianki z zakrytymi palcami|Sandálias romanas de bico fechado|包头罗马凉鞋
distressed paint-splatter jeans|Distressed paint-splatter jeans|Jeans in Used-Optik mit Farbspritzern|Vaqueros desgastados con salpicaduras de pintura|Jean usé à éclaboussures de peinture|Jeans effetto vissuto con schizzi di vernice|Przecierane dżinsy z efektem farby|Jeans desgastados com respingos de tinta|做旧泼墨牛仔裤
lace-up breathable high-top sneakers|Breathable lace-up high-top sneakers|Atmungsaktive High-Top-Sneaker mit Schnürung|Zapatillas altas transpirables con cordones|Baskets montantes respirantes à lacets|Sneaker alte traspiranti con lacci|Sznurowane przewiewne sneakersy za kostkę|Tênis de cano alto respiráveis com cadarço|透气系带高帮运动鞋
high-top sneakers|High-top sneakers|High-Top-Sneaker|Zapatillas altas|Baskets montantes|Sneaker alte|Sneakersy za kostkę|Tênis de cano alto|高帮运动鞋
low-top sneakers|Low-top sneakers|Low-Top-Sneaker|Zapatillas bajas|Baskets basses|Sneaker basse|Niskie sneakersy|Tênis de cano baixo|低帮运动鞋
high-top|high-top|hoch geschnitten|de caña alta|montant|a collo alto|za kostkę|de cano alto|高帮
low-top|low-top|niedrig geschnitten|de caña baja|bas|a collo basso|z niską cholewką|de cano baixo|低帮
lace-up|lace-up|mit Schnürung|con cordones|à lacets|con lacci|sznurowane|com cadarço|系带
breathable|breathable|atmungsaktiv|transpirable|respirant|traspirante|przewiewne|respirável|透气
colorful|multicolored|mehrfarbig|multicolor|multicolore|multicolore|wielokolorowe|multicolorido|多彩
lambswool|lambswool|Lammwolle|lana de cordero|laine d’agneau|lana d’agnello|wełna jagnięca|lã de cordeiro|羊羔毛
gradient|gradient|Farbverlauf|degradado|dégradé|sfumato|gradient|degradê|渐变
fabric|fabric|Stoff|tejido|tissu|tessuto|tkanina|tecido|织物
non-slip|non-slip|rutschfest|antideslizante|antidérapant|antiscivolo|antypoślizgowe|antiderrapante|防滑
wear-resistant|wear-resistant|abriebfest|resistente al desgaste|résistant à l’usure|resistente all’usura|odporne na ścieranie|resistente ao desgaste|耐磨
glossy finish|glossy finish|Glanzfinish|acabado brillante|finition brillante|finitura lucida|błyszczące wykończenie|acabamento brilhante|亮面
athletic shoes|Athletic shoes|Sportschuhe|Calzado deportivo|Chaussures de sport|Scarpe sportive|Buty sportowe|Calçados esportivos|运动鞋
embroidered|embroidered|bestickt|bordado|brodé|ricamato|haftowane|bordado|刺绣
platform beach sandals|Platform beach sandals|Plateau-Strandsandalen|Sandalias de playa con plataforma|Sandales de plage à plateforme|Sandali da spiaggia con plateau|Sandały plażowe na platformie|Sandálias de praia com plataforma|厚底沙滩凉鞋
studded|studded|mit Nieten|con tachuelas|clouté|con borchie|z ćwiekami|com tachas|铆钉装饰
warm coat|Warm coat|Warmer Mantel|Abrigo cálido|Manteau chaud|Cappotto caldo|Ciepły płaszcz|Casaco quente|保暖外套
pants/shorts|Pants & shorts|Hosen und Shorts|Pantalones y shorts|Pantalons et shorts|Pantaloni e shorts|Spodnie i szorty|Calças e shorts|裤装与短裤
hoodies/sweaters|Hoodies & sweaters|Hoodies und Pullover|Sudaderas y jerséis|Sweats à capuche et pulls|Felpe e maglioni|Bluzy z kapturem i swetry|Moletons e suéteres|连帽衫与毛衣
short sets,short set|Short set|Sommer-Set|Conjunto corto|Ensemble court|Completo corto|Komplet z szortami|Conjunto com shorts|短装套装
other stuff|Other items|Sonstiges|Otros artículos|Autres articles|Altri articoli|Pozostałe produkty|Outros produtos|其他商品
headwear|Headwear|Kopfbedeckung|Gorro o sombrero|Couvre-chef|Copricapo|Nakrycia głowy|Bonés e chapéus|帽饰
accessories|Accessories|Accessoires|Accesorios|Accessoires|Accessori|Akcesoria|Acessórios|配饰
electronics|Electronics|Elektronik|Electrónica|Électronique|Elettronica|Elektronika|Eletrônicos|电子产品
quilted jacket|Quilted jacket|Steppjacke|Chaqueta acolchada|Veste matelassée|Giacca trapuntata|Kurtka pikowana|Jaqueta matelassê|绗缝夹克
puffer jacket,down jacket,down jackets,down coat|Down jacket|Daunenjacke|Plumífero|Doudoune|Piumino|Kurtka puchowa|Jaqueta de plumas|羽绒服
windbreaker,windbreakers|Windbreaker|Windjacke|Cortavientos|Coupe-vent|Giacca a vento|Wiatrówka|Corta-vento|防风夹克
knitted hat,beanie,beanies|Beanie|Strickmütze|Gorro de punto|Bonnet|Berretto in maglia|Czapka dzianinowa|Gorro de tricô|针织帽
bucket hat|Bucket hat|Fischerhut|Sombrero de pescador|Bob|Cappello da pescatore|Kapelusz rybacki|Chapéu bucket|渔夫帽
baseball cap|Baseball cap|Baseballkappe|Gorra de béisbol|Casquette de baseball|Cappellino da baseball|Czapka z daszkiem|Boné de beisebol|棒球帽
long sleeved shirt,long-sleeved shirt,long sleeve shirt|Long-sleeved shirt|Langarmhemd|Camisa de manga larga|Chemise à manches longues|Camicia a maniche lunghe|Koszula z długim rękawem|Camisa de manga longa|长袖衬衫
short sleeved shirt,short sleeve shirt|Short-sleeved shirt|Kurzarmhemd|Camisa de manga corta|Chemise à manches courtes|Camicia a maniche corte|Koszula z krótkim rękawem|Camisa de manga curta|短袖衬衫
longsleeves,longsleeve,long-sleeve t-shirt,long sleeve t-shirt,long-sleeved t-shirt|Long-sleeved T-shirt|Langarmshirt|Camiseta de manga larga|T-shirt à manches longues|Maglietta a maniche lunghe|Koszulka z długim rękawem|Camiseta de manga longa|长袖T恤
hoodies,hoodie,hooded sweatshirt,hoodi|Hoodie|Kapuzenpullover|Sudadera con capucha|Sweat à capuche|Felpa con cappuccio|Bluza z kapturem|Moletom com capuz|连帽衫
sweatshirts,sweatshirt,sweatsirt,sudadera,sudaderas|Sweatshirt|Sweatshirt|Sudadera|Sweat|Felpa|Bluza|Moletom|卫衣
sweaters,sweater,pullover,jumper|Sweater|Pullover|Jersey|Pull|Maglione|Sweter|Suéter|毛衣
t-shirts,t-shirt,t shirts,t shirt,tshirts,tshirt,t-sirt,t-shir,tees,tee,camiseta,camisetas|T-shirt|T-Shirt|Camiseta|T-shirt|Maglietta|Koszulka|Camiseta|T恤
denim jacket|Denim jacket|Jeansjacke|Chaqueta vaquera|Veste en jean|Giacca di jeans|Kurtka dżinsowa|Jaqueta jeans|牛仔夹克
jackets,jacket,cazadora,cazadoras,chaqueta|Jacket|Jacke|Chaqueta|Veste|Giacca|Kurtka|Jaqueta|夹克
cardigans,cardigan|Cardigan|Strickjacke|Cárdigan|Gilet en maille|Cardigan|Kardigan|Cardigã|针织开衫
coats,coat|Coat|Mantel|Abrigo|Manteau|Cappotto|Płaszcz|Casaco|大衣
vests,vest,chaleco|Vest|Weste|Chaleco|Gilet|Gilet|Kamizelka|Colete|背心
shirts,shirt,camisa|Shirt|Hemd|Camisa|Chemise|Camicia|Koszula|Camisa|衬衫
polo shirt,polo shirts,polo|Polo shirt|Poloshirt|Polo|Polo|Polo|Koszulka polo|Camisa polo|Polo衫
football jerseys,football jersey,soccer jersey|Football jersey|Fußballtrikot|Camiseta de fútbol|Maillot de football|Maglia da calcio|Koszulka piłkarska|Camisa de futebol|足球球衣
jerseys,jersey|Jersey|Trikot|Camiseta deportiva|Maillot|Maglia sportiva|Koszulka sportowa|Camisa esportiva|球衣
trousers,pants,pantalones|Pants|Hose|Pantalón|Pantalon|Pantaloni|Spodnie|Calças|长裤
sweatpants,joggers|Sweatpants|Jogginghose|Pantalón de chándal|Pantalon de jogging|Pantaloni da tuta|Spodnie dresowe|Calça de moletom|运动裤
cargo pants,cargo trousers|Cargo pants|Cargohose|Pantalón cargo|Pantalon cargo|Pantaloni cargo|Bojówki|Calça cargo|工装裤
shorts|Shorts|Shorts|Pantalón corto|Short|Shorts|Szorty|Shorts|短裤
jeans,jean|Jeans|Jeans|Vaqueros|Jean|Jeans|Dżinsy|Jeans|牛仔裤
tracksuits,tracksuit|Tracksuit|Trainingsanzug|Chándal|Survêtement|Tuta sportiva|Dres|Agasalho|运动套装
suits,suit,sets,set|Set|Set|Conjunto|Ensemble|Completo|Komplet|Conjunto|套装
underwear|Underwear|Unterwäsche|Ropa interior|Sous-vêtements|Intimo|Bielizna|Roupa íntima|内衣
briefs,boxers,boxer|Underpants|Unterhose|Calzoncillos|Slip|Mutande|Majtki|Cueca|内裤
tights,leggings|Leggings|Leggings|Mallas|Legging|Leggings|Legginsy|Legging|紧身裤
bikini,bikinis|Bikini|Bikini|Bikini|Bikini|Bikini|Bikini|Biquíni|比基尼
dress,dresses|Dress|Kleid|Vestido|Robe|Abito|Sukienka|Vestido|连衣裙
shoes,shoe,zapatos|Shoes|Schuhe|Zapatos|Chaussures|Scarpe|Buty|Calçados|鞋款
sneakers,sneaker,trainers,zapatillas|Sneakers|Sneaker|Zapatillas|Baskets|Sneaker|Sneakersy|Tênis|运动鞋
slides,slide,slippers,slipper|Slippers|Pantoletten|Chanclas|Mules|Ciabatte|Klapki|Chinelos|拖鞋
sandals,sandal|Sandals|Sandalen|Sandalias|Sandales|Sandali|Sandały|Sandálias|凉鞋
boots,boot|Boots|Stiefel|Botas|Bottes|Stivali|Buty z cholewką|Botas|靴子
loafers,loafer|Loafers|Slipper|Mocasines|Mocassins|Mocassini|Mokasyny|Mocassins|乐福鞋
socks,sock|Socks|Socken|Calcetines|Chaussettes|Calze|Skarpety|Meias|袜子
phone case,phone cases,mobile phone case|Phone case|Handyhülle|Funda de móvil|Coque de téléphone|Custodia per telefono|Etui na telefon|Capa de celular|手机壳
shoulder bag,crossbody bag,messenger bag|Shoulder bag|Umhängetasche|Bandolera|Sac à bandoulière|Borsa a tracolla|Torba na ramię|Bolsa tiracolo|斜挎包
tote bag,shopping bag|Tote bag|Tragetasche|Bolso tote|Cabas|Borsa shopper|Torba na zakupy|Bolsa de compras|托特包
bags,bag,bolso,bolsos|Bag|Tasche|Bolso|Sac|Borsa|Torba|Bolsa|包
handbags,handbag,purse|Handbag|Handtasche|Bolso de mano|Sac à main|Borsa a mano|Torebka|Bolsa de mão|手提包
backpack,backpacks|Backpack|Rucksack|Mochila|Sac à dos|Zaino|Plecak|Mochila|双肩包
wallets,wallet,walle,cartera|Wallet|Geldbörse|Cartera|Portefeuille|Portafoglio|Portfel|Carteira|钱包
card holder,cardholder|Card holder|Kartenetui|Tarjetero|Porte-cartes|Portacarte|Etui na karty|Porta-cartões|卡包
belts,belt,cinturón|Belt|Gürtel|Cinturón|Ceinture|Cintura|Pasek|Cinto|腰带
bracelets,bracelet,bangle,brazalete|Bracelet|Armband|Pulsera|Bracelet|Bracciale|Bransoletka|Pulseira|手链
necklaces,necklace|Necklace|Halskette|Collar|Collier|Collana|Naszyjnik|Colar|项链
earrings,earring|Earrings|Ohrringe|Pendientes|Boucles d’oreilles|Orecchini|Kolczyki|Brincos|耳环
rings,ring|Ring|Ring|Anillo|Bague|Anello|Pierścionek|Anel|戒指
watches,watch,reloj|Watch|Armbanduhr|Reloj|Montre|Orologio|Zegarek|Relógio|腕表
scarves,scarf|Scarf|Schal|Bufanda|Écharpe|Sciarpa|Szalik|Cachecol|围巾
hats,hat|Hat|Hut|Sombrero|Chapeau|Cappello|Kapelusz|Chapéu|帽子
caps,cap,gorra|Cap|Kappe|Gorra|Casquette|Cappellino|Czapka z daszkiem|Boné|棒球帽
sunglasses,sunglass|Sunglasses|Sonnenbrille|Gafas de sol|Lunettes de soleil|Occhiali da sole|Okulary przeciwsłoneczne|Óculos de sol|太阳镜
glasses,eyeglasses|Glasses|Brille|Gafas|Lunettes|Occhiali|Okulary|Óculos|眼镜
jewelry,jewellery|Jewelry|Schmuck|Joyas|Bijoux|Gioielli|Biżuteria|Joias|珠宝
perfumes,perfume,fragrance|Perfume|Parfüm|Perfume|Parfum|Profumo|Perfumy|Perfume|香水
gloves,glove|Gloves|Handschuhe|Guantes|Gants|Guanti|Rękawiczki|Luvas|手套
keychain,keyring|Key ring|Schlüsselanhänger|Llavero|Porte-clés|Portachiavi|Brelok|Chaveiro|钥匙扣
earbuds,earphones,headphones|Headphones|Kopfhörer|Auriculares|Écouteurs|Cuffie|Słuchawki|Fones de ouvido|耳机
hairdryer,hair dryer|Hair dryer|Haartrockner|Secador|Sèche-cheveux|Asciugacapelli|Suszarka do włosów|Secador de cabelo|吹风机
speakers,speaker|Speaker|Lautsprecher|Altavoz|Enceinte|Altoparlante|Głośnik|Alto-falante|扬声器
umbrella|Umbrella|Regenschirm|Paraguas|Parapluie|Ombrello|Parasol|Guarda-chuva|雨伞
plush|Plush toy|Plüschtier|Peluche|Peluche|Peluche|Pluszak|Pelúcia|毛绒玩具
mechanical watch|Mechanical watch|Mechanische Uhr|Reloj mecánico|Montre mécanique|Orologio meccanico|Zegarek mechaniczny|Relógio mecânico|机械表
styles,style,estilos|styles|Varianten|variantes|variantes|varianti|warianty|variantes|款式
colors,colours,color,colour,colores|colors|Farben|colores|coloris|colori|kolory|cores|配色
high quality,top quality,best quality|high quality|hochwertig|alta calidad|haute qualité|alta qualità|wysoka jakość|alta qualidade|高品质
high version|high version|höhere Ausführung|versión superior|version supérieure|versione superiore|wersja premium|versão premium|高配版
collection|collection|Kollektion|colección|collection|collezione|kolekcja|coleção|系列
series|series|Serie|serie|série|serie|seria|série|系列
version|version|Ausführung|versión|version|versione|wersja|versão|版本
women’s,women's,womens,women,woman,ladies|women’s|Damen|mujer|femme|donna|damskie|feminino|女款
men’s,men's,mens,men,man|men’s|Herren|hombre|homme|uomo|męskie|masculino|男款
children,kids|kids|Kinder|infantil|enfant|bambini|dziecięce|infantil|儿童
zip up,zip-up|zip-up|mit Reißverschluss|con cremallera|zippé|con zip|z zamkiem|com zíper|拉链款
long-sleeved,long sleeved,long sleeve,long sleeves|long sleeves|Langarm|manga larga|manches longues|maniche lunghe|z długim rękawem|mangas longas|长袖
short-sleeved,short sleeved,short sleeve,short sleeves|short sleeves|Kurzarm|manga corta|manches courtes|maniche corte|z krótkim rękawem|mangas curtas|短袖
limited edition|limited edition|Sonderedition|edición limitada|édition limitée|edizione limitata|edycja limitowana|edição limitada|限量版
cotton|cotton|Baumwolle|algodón|coton|cotone|bawełna|algodão|棉
leather|leather|Leder|piel|cuir|pelle|skóra|couro|皮革
canvas|canvas|Canvas|lona|toile|tela|płótno|lona|帆布
denim|denim|Denim|tejido vaquero|denim|denim|denim|jeans|牛仔布
knitted,knit|knit|Strick|punto|maille|maglia|dzianinowy|de tricô|针织
embroidered|embroidered|bestickt|bordado|brodé|ricamato|haftowany|bordado|刺绣
graphic print,printed|printed|bedruckt|estampado|imprimé|stampato|nadruk graficzny|estampa gráfica|印花
quilted|quilted|gesteppt|acolchado|matelassé|trapuntato|pikowany|matelassê|绗缝
distressed|distressed|Used-Look|efecto desgastado|effet usé|effetto usurato|postarzany|desgastado|做旧
slim fit|slim fit|schmale Passform|corte ajustado|coupe ajustée|vestibilità aderente|dopasowany krój|corte ajustado|修身
wide leg|wide leg|weites Bein|pernera ancha|jambes larges|gamba larga|szeroka nogawka|perna larga|阔腿
wireless|wireless|kabellos|inalámbrico|sans fil|senza fili|bezprzewodowy|sem fio|无线
black|black|Schwarz|negro|noir|nero|czarny|preto|黑色
white|white|Weiß|blanco|blanc|bianco|biały|branco|白色
blue|blue|Blau|azul|bleu|blu|niebieski|azul|蓝色
green|green|Grün|verde|vert|verde|zielony|verde|绿色
red|red|Rot|rojo|rouge|rosso|czerwony|vermelho|红色
pink|pink|Rosa|rosa|rose|rosa|różowy|rosa|粉色
grey,gray|grey|Grau|gris|gris|grigio|szary|cinza|灰色
brown|brown|Braun|marrón|marron|marrone|brązowy|marrom|棕色
gold|gold|Gold|dorado|or|oro|złoty|dourado|金色
silver|silver|Silber|plateado|argent|argento|srebrny|prateado|银色
iphone case|iPhone case|iPhone-Hülle|Funda para iPhone|Coque pour iPhone|Custodia per iPhone|Etui na iPhone|Capa de iPhone|iPhone 手机壳
flip-flops,flip flops|Flip-flops|Zehentrenner|Chanclas|Tongs|Infradito|Japonki|Chinelos de dedo|人字拖
clogs|Clogs|Clogs|Zuecos|Sabots|Zoccoli|Chodaki|Tamancos|包头拖鞋
mules|Mules|Pantoletten|Mules|Mules|Sabot|Klapki mule|Mules|穆勒鞋
high heel,high heels|High heels|Pumps|Zapatos de tacón|Talons hauts|Tacchi alti|Buty na obcasie|Sapatos de salto alto|高跟鞋
ski goggles|Ski goggles|Skibrille|Gafas de esquí|Masque de ski|Maschera da sci|Gogle narciarskie|Óculos de esqui|滑雪镜
waist pack,belt bag|Waist pack|Gürteltasche|Riñonera|Sac banane|Marsupio|Nerka|Pochete|腰包
minibag,mini bag|Mini bag|Minitasche|Minibolso|Mini-sac|Mini borsa|Mała torebka|Minibolsa|迷你包
card case|Card case|Kartenetui|Tarjetero|Porte-cartes|Portacarte|Etui na karty|Porta-cartões|卡包
slacks|Slacks|Stoffhose|Pantalón de vestir|Pantalon habillé|Pantaloni eleganti|Spodnie wizytowe|Calças sociais|休闲西裤
zip jacket|Zip jacket|Reißverschlussjacke|Chaqueta con cremallera|Veste zippée|Giacca con zip|Kurtka na zamek|Jaqueta com zíper|拉链夹克
goggles|Goggles|Schutzbrille|Gafas protectoras|Lunettes de protection|Occhiali protettivi|Gogle|Óculos de proteção|护目镜
mask|Mask|Maske|Máscara|Masque|Maschera|Maska|Máscara|面罩
camping mug|Camping mug|Campingbecher|Taza de camping|Tasse de camping|Tazza da campeggio|Kubek turystyczny|Caneca de camping|露营杯
stainless steel|stainless steel|Edelstahl|acero inoxidable|acier inoxydable|acciaio inossidabile|stal nierdzewna|aço inoxidável|不锈钢
drawstring|drawstring|Kordelzug|cordón ajustable|cordon de serrage|coulisse|sznurek|cordão|抽绳
crew neck,crewneck|crew neck|Rundhals|cuello redondo|col rond|girocollo|okrągły dekolt|gola redonda|圆领
crew neck top,yoga top,top|Top|Oberteil|Top|Haut|Top|Top|Blusa|上衣
tanks,tank top|Tank top|Tanktop|Camiseta de tirantes|Débardeur|Canotta|Top bez rękawów|Regata|吊带背心
new arrival,new arrivals|new arrival|Neuheit|novedad|nouveauté|novità|nowość|novidade|新款
new|new|neu|nuevo|nouveau|nuovo|nowy|novo|新款
classic|classic|klassisch|clásico|classique|classico|klasyczny|clássico|经典款
loose-fitting,loose fitting,loose|loose fit|weite Passform|corte holgado|coupe ample|vestibilità ampia|luźny krój|modelagem ampla|宽松版型
casual|casual|lässig|informal|décontracté|casual|codzienny|casual|休闲
comfortable|comfortable|bequem|cómodo|confortable|comodo|wygodny|confortável|舒适款
design|design|Design|diseño|design|design|wzór|design|设计
new design|new design|neues Design|nuevo diseño|nouveau design|nuovo design|nowy wzór|novo design|新设计
patchwork|patchwork|Patchwork|patchwork|patchwork|patchwork|patchwork|patchwork|拼接
striped|striped|gestreift|a rayas|rayé|a righe|w paski|listrado|条纹
crew|crew|Crew|crew|crew|crew|o okrągłym dekolcie|de gola redonda|圆领
lightweight|lightweight|leicht|ligero|léger|leggero|lekki|leve|轻量
reversible|reversible|wendbar|reversible|réversible|reversibile|dwustronny|reversível|双面
winter|winter|Winter|invierno|hiver|inverno|zimowy|de inverno|冬季
sports|sports|Sport|deporte|sport|sport|sportowy|esportivo|运动
vintage|vintage|Vintage|vintage|vintage|vintage|vintage|vintage|复古
fleece|fleece|Fleece|forro polar|polaire|pile|polar|fleece|摇粒绒
printed,print|print|Druck|estampado|imprimé|stampa|nadruk|estampa|印花
pendant|pendant|Anhänger|colgante|pendentif|ciondolo|zawieszka|pingente|吊坠
jewelled,rhinestone|rhinestone|Strass|pedrería|strass|strass|cyrkonie|strass|水钻
half-zip|half zip|halber Reißverschluss|media cremallera|demi-zip|mezza zip|krótki zamek|meio zíper|半拉链
full zip|full zip|durchgehender Reißverschluss|cremallera completa|zip intégral|zip intera|pełny zamek|zíper inteiro|全拉链
best quality,bese quality|high quality|hochwertig|alta calidad|haute qualité|alta qualità|wysoka jakość|alta qualidade|高品质
styles available|styles available|Varianten verfügbar|variantes disponibles|variantes disponibles|varianti disponibili|dostępne warianty|variantes disponíveis|可选款式
best|best|beste|mejor|meilleur|migliore|najlepszy|melhor|优选
stylish|stylish|modisch|de moda|élégant|alla moda|stylowy|elegante|时尚款
and|and|und|y|et|e|i|e|和
with|with|mit|con|avec|con|z|com|带
wind breaker|Windbreaker|Windjacke|Cortavientos|Coupe-vent|Giacca a vento|Wiatrówka|Corta-vento|防风夹克
hair straighteners,hair straightener,straightener|Hair straightener|Haarglätter|Plancha de pelo|Lisseur|Piastra per capelli|Prostownica|Prancha de cabelo|直发器
ski googles|Ski goggles|Skibrille|Gafas de esquí|Masque de ski|Maschera da sci|Gogle narciarskie|Óculos de esqui|滑雪镜
trainers,trainer,snrakersa|Trainers|Sneaker|Zapatillas|Baskets|Sneakers|Sneakersy|Tênis|运动鞋
headset|Headset|Headset|Auriculares|Casque audio|Cuffie|Zestaw słuchawkowy|Headset|耳机
mobile phone,cell phone|Mobile phone|Mobiltelefon|Teléfono móvil|Téléphone portable|Cellulare|Telefon komórkowy|Celular|手机
phone holder|Phone holder|Handyhalterung|Soporte para móvil|Support de téléphone|Supporto per telefono|Uchwyt na telefon|Suporte para celular|手机支架
car mounted|Car-mounted|fürs Auto|para coche|pour voiture|per auto|samochodowy|para carro|车载
puffers,puffer|Puffer jacket|Steppjacke|Chaqueta acolchada|Doudoune|Piumino|Kurtka puchowa|Jaqueta acolchoada|棉服
sunglasses,sunglass|Sunglasses|Sonnenbrille|Gafas de sol|Lunettes de soleil|Occhiali da sole|Okulary przeciwsłoneczne|Óculos de sol|太阳镜
pulsera|Bracelet|Armband|Pulsera|Bracelet|Bracciale|Bransoletka|Pulseira|手链
vestido|Dress|Kleid|Vestido|Robe|Abito|Sukienka|Vestido|连衣裙
bolsa|Bag|Tasche|Bolso|Sac|Borsa|Torba|Bolsa|包袋
pantalón corto,antalón corto|Shorts|Shorts|Pantalón corto|Short|Pantaloncini|Szorty|Shorts|短裤
gift box|Gift box|Geschenkbox|Caja de regalo|Coffret cadeau|Confezione regalo|Pudełko prezentowe|Caixa de presente|礼盒
duffle bag,duffel bag|Travel bag|Reisetasche|Bolsa de viaje|Sac de voyage|Borsone|Torba podróżna|Bolsa de viagem|旅行包
waist bag|Waist bag|Gürteltasche|Riñonera|Sac banane|Marsupio|Nerka|Pochete|腰包
hand luggage|Hand luggage|Handgepäck|Equipaje de mano|Bagage à main|Bagaglio a mano|Bagaż podręczny|Bagagem de mão|随身行李
duffle,duffel|Travel bag|Reisetasche|Bolsa de viaje|Sac de voyage|Borsone|Torba podróżna|Bolsa de viagem|旅行包
flip-flop,flip flop|Flip-flop|Zehentrenner|Chancla|Tong|Infradito|Japonka|Chinelo de dedo|人字拖
dress shirt|Dress shirt|Oberhemd|Camisa de vestir|Chemise habillée|Camicia elegante|Koszula wizytowa|Camisa social|正装衬衫
training shoes,running shoes|Running shoes|Laufschuhe|Zapatillas de running|Chaussures de course|Scarpe da corsa|Buty do biegania|Tênis de corrida|跑鞋
hooded jacket|Hooded jacket|Kapuzenjacke|Chaqueta con capucha|Veste à capuche|Giacca con cappuccio|Kurtka z kapturem|Jaqueta com capuz|连帽夹克
denim shorts|Denim shorts|Jeansshorts|Pantalones cortos vaqueros|Short en jean|Pantaloncini di jeans|Szorty dżinsowe|Shorts jeans|牛仔短裤
boxer briefs|Boxer briefs|Boxershorts|Bóxers|Boxers|Boxer|Bokserki|Cueca boxer|平角内裤
button down shirt|Button-down shirt|Button-down-Hemd|Camisa con cuello abotonado|Chemise à col boutonné|Camicia con colletto button-down|Koszula z kołnierzykiem na guziki|Camisa com colarinho abotoado|纽扣领衬衫
jacket for men|Men’s jacket|Herrenjacke|Chaqueta de hombre|Veste pour homme|Giacca da uomo|Kurtka męska|Jaqueta masculina|男士夹克
sneaker shoes,shoes sneakers|Sneakers|Sneaker|Zapatillas|Baskets|Sneakers|Sneakersy|Tênis|运动鞋
protective case|Protective case|Schutzhülle|Funda protectora|Coque de protection|Custodia protettiva|Etui ochronne|Capa protetora|保护壳
hair clip|Hair clip|Haarspange|Pinza de pelo|Barrette|Fermaglio per capelli|Spinka do włosów|Presilha de cabelo|发夹
bag decoration|Bag charm|Taschenanhänger|Colgante para bolso|Bijou de sac|Charm per borsa|Zawieszka do torby|Pingente de bolsa|包饰
reflective|reflective|reflektierend|reflectante|réfléchissant|riflettente|odblaskowy|refletivo|反光
unisex|unisex|Unisex|unisex|unisexe|unisex|unisex|unissex|男女通用
waterproof|waterproof|wasserdicht|impermeable|imperméable|impermeabile|wodoodporny|impermeável|防水
hooded|hooded|mit Kapuze|con capucha|à capuche|con cappuccio|z kapturem|com capuz|连帽
clothing,clothes|Clothing|Kleidung|Ropa|Vêtements|Abbigliamento|Odzież|Roupas|服装
shoulder|shoulder|Schulter|hombro|épaule|spalla|ramię|ombro|肩
long socks|Long socks|Lange Socken|Calcetines largos|Chaussettes hautes|Calze lunghe|Długie skarpety|Meias longas|长袜
clog|Clog|Clog|Zueco|Sabot|Zoccolo|Chodak|Tamanco|木屐
cherry|cherry|Kirsche|cereza|cerise|ciliegia|wiśnia|cereja|樱桃
cotton clothes|Cotton clothing|Baumwollkleidung|Ropa de algodón|Vêtements en coton|Abbigliamento in cotone|Odzież bawełniana|Roupa de algodão|棉质服装
running|running|Laufen|running|course|corsa|bieganie|corrida|跑步
style,styles available|Style|Variante|Variante|Variante|Variante|Wariant|Variante|款式
`.trim().split('\n').map(row => row.split('|'));
const protectedNames = ['New Era','New York','New Orleans','New Jersey','New England','Chrome Hearts','Fear of God','Stone Island','New Balance','Stone Roses','Golden State','White Mountaineering','Black Sabbath','Black Scale','Black Diamond','Red Bull','Red Sox','Pink Panther','Blue Jays','Green Bay','Golden Goose','The North Face','Stone Island','Fear of God','Off White','Off-White','White Mountaineering','Canada Goose','New Balance','Palm Angels','Chrome Hearts','Golden Goose','Red Wing','Blue Moon','Blue Version','Nike Air Force','Air Jordan','Air Max','Apple Watch','Apple Watch Series','Polo Ralph Lauren','Polo Bear','Pink Floyd','Black Cat','Black Phantom','Black Opium','Black Orchid','White Fox','Broken Planet','Silver Bullet','Blue Tint','Pure White','Air Force','Purple Brand','Green Goblin','Red Thunder','Blue Chill','Brown Thomas','Stone Cold','Gold Label','Silver Shadow','Gold Collection','Black Label'];

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function wordPattern(words) {
  return new RegExp('(?<![\\p{L}])(?:' + [...words].sort((a,b) => b.length-a.length).map(escapeRegExp).join('|') + ')(?![\\p{L}])','giu');
}
const skuRows = [
  ['标准礼盒|標準禮盒','Standard gift box','Standard-Geschenkbox','Caja de regalo estándar','Coffret cadeau standard','Confezione regalo standard','Standardowe pudełko prezentowe','Caixa de presente padrão','标准礼盒'],
  ['原装礼盒（品质保证，不退不换）','Original gift box (quality guaranteed, no returns or exchanges)','Original-Geschenkbox (Qualitätsgarantie, keine Rückgabe oder Umtausch)','Caja de regalo original (calidad garantizada, sin devoluciones ni cambios)','Coffret cadeau d’origine (qualité garantie, sans retour ni échange)','Confezione regalo originale (qualità garantita, senza resi o cambi)','Oryginalne pudełko prezentowe (gwarancja jakości, bez zwrotów i wymiany)','Caixa de presente original (qualidade garantida, sem devoluções ou trocas)','原装礼盒（品质保证，不退不换）'],
  ['无礼盒|無禮盒','Without a gift box','Ohne Geschenkbox','Sin caja de regalo','Sans coffret cadeau','Senza confezione regalo','Bez pudełka prezentowego','Sem caixa de presente','无礼盒'],
  ['标准尺码|標準尺碼','Standard sizing','Standardgröße','Tallaje estándar','Taille standard','Taglia standard','Standardowa rozmiarówka','Tamanho padrão','标准尺码'],
  ['配色|颜色组合|顏色組合','Color scheme','Farbkombination','Combinación de colores','Coloris','Combinazione di colori','Kolorystyka','Combinação de cores','配色'],
  ['颜色|色号|顏色','Color','Farbe','Color','Couleur','Colore','Kolor','Cor','颜色'],
  ['尺寸|尺码|尺碼|碼數','Size','Größe','Talla','Taille','Taglia','Rozmiar','Tamanho','尺码'],
  ['款式|款型|型号|型號','Style','Variante','Variante','Variante','Variante','Wariant','Variante','款式'],
  ['均码|均碼|通码|通碼','One size','Einheitsgröße','Talla única','Taille unique','Taglia unica','Rozmiar uniwersalny','Tamanho único','均码'],
  ['男款|男士|男式','Men’s','Herren','Hombre','Homme','Uomo','Męski','Masculino','男款'],
  ['女款|女士|女式','Women’s','Damen','Mujer','Femme','Donna','Damski','Feminino','女款'],
  ['浅灰色|淺灰色|浅灰|淺灰','Light gray','Hellgrau','Gris claro','Gris clair','Grigio chiaro','Jasnoszary','Cinza-claro','浅灰色'],
  ['深灰色|深灰','Dark gray','Dunkelgrau','Gris oscuro','Gris foncé','Grigio scuro','Ciemnoszary','Cinza-escuro','深灰色'],
  ['藏青色|藏青|海军蓝|海軍藍','Navy','Marineblau','Azul marino','Bleu marine','Blu navy','Granatowy','Azul-marinho','藏青色'],
  ['米色|米白色|米白','Beige','Beige','Beis','Beige','Beige','Beżowy','Bege','米色'],
  ['卡其色|卡其','Khaki','Khaki','Caqui','Kaki','Cachi','Khaki','Cáqui','卡其色'],
  ['紫色|紫','Purple','Violett','Morado','Violet','Viola','Fioletowy','Roxo','紫色'],
  ['黄色|黃色|黄|黃','Yellow','Gelb','Amarillo','Jaune','Giallo','Żółty','Amarelo','黄色'],
  ['橙色|橘色','Orange','Orange','Naranja','Orange','Arancione','Pomarańczowy','Laranja','橙色'],
  ['黑色|黑','Black','Schwarz','Negro','Noir','Nero','Czarny','Preto','黑色'],
  ['白色|白','White','Weiß','Blanco','Blanc','Bianco','Biały','Branco','白色'],
  ['藍色|蓝色|蓝|藍','Blue','Blau','Azul','Bleu','Blu','Niebieski','Azul','蓝色'],
  ['红色|紅色|红|紅','Red','Rot','Rojo','Rouge','Rosso','Czerwony','Vermelho','红色'],
  ['绿色|綠色|绿|綠','Green','Grün','Verde','Vert','Verde','Zielony','Verde','绿色'],
  ['灰色|灰','Gray','Grau','Gris','Gris','Grigio','Szary','Cinza','灰色'],
  ['棕色|咖啡色|棕','Brown','Braun','Marrón','Marron','Marrone','Brązowy','Marrom','棕色'],
  ['粉红色|粉紅色|粉色|粉','Pink','Rosa','Rosa','Rose','Rosa','Różowy','Rosa','粉色'],
  ['银色|銀色','Silver','Silber','Plateado','Argenté','Argento','Srebrny','Prateado','银色'],
  ['金色','Gold','Gold','Dorado','Doré','Oro','Złoty','Dourado','金色'],
  ['套装|套裝','Set','Set','Conjunto','Ensemble','Completo','Komplet','Conjunto','套装']
];
const expandedTerms = {"de":{"hoodie":"Kapuzenpullover","sweatshirt":"Sweatshirt","sweater":"Pullover","t-shirt":"T-Shirt","shirt":"Hemd","jacket":"Jacke","down jacket":"Daunenjacke","puffer jacket":"Steppjacke","coat":"Mantel","windbreaker":"Windjacke","vest":"Weste","pants":"Hose","sweatpants":"Jogginghose","jeans":"Jeans","shorts":"Shorts","tracksuit":"Trainingsanzug","set":"Set","jersey":"Trikot","sneakers":"Sneaker","shoes":"Schuhe","boots":"Stiefel","sandals":"Sandalen","slippers":"Hausschuhe","loafers":"Slipper","pumps":"Pumps","bag":"Tasche","backpack":"Rucksack","wallet":"Geldbörse","card holder":"Kartenetui","belt":"Gürtel","hat":"Hut","cap":"Kappe","beanie":"Strickmütze","scarf":"Schal","socks":"Socken","underwear":"Unterwäsche","sunglasses":"Sonnenbrille","glasses":"Brille","watch":"Armbanduhr","bracelet":"Armband","necklace":"Halskette","earrings":"Ohrringe","ring":"Ring","perfume":"Parfüm","headphones":"Kopfhörer","earbuds":"In-Ear-Kopfhörer","speaker":"Lautsprecher","phone case":"Handyhülle","styles":"Varianten","colors":"Farben","logo":"Logo","print":"Print","long sleeve":"Langarm","short sleeve":"Kurzarm","leather":"Leder","cotton":"Baumwolle","denim":"Denim","knit":"Strick","hooded":"mit Kapuze","zip":"Reißverschluss","black":"Schwarz","white":"Weiß","blue":"Blau","red":"Rot","pink":"Rosa","green":"Grün","grey":"Grau","brown":"Braun","beige":"Beige","oversized":"Oversize","low-top":"niedriger Schaft","high-top":"hoher Schaft","running":"Laufen","retro":"Retro","casual":"Freizeit","men":"Herren","women":"Damen","children":"Kinder","wireless":"kabellos","portable":"tragbar","floral":"Blumenmuster","stripe":"Streifen","rainbow":"Regenbogen","half-zip":"Halbreißverschluss","fleece":"Fleece","embroidered":"bestickt","distressed":"Used-Look","ribbed":"Rippstrick","mesh":"Mesh","canvas":"Canvas","wool":"Wolle","suede":"Wildleder","crossbody":"Crossbody","shoulder":"Schulter","tote":"Shopper","keychain":"Schlüsselanhänger","gloves":"Handschuhe","tie":"Krawatte","jewelry":"Schmuck","ski mask":"Skimaske","polo shirt":"Poloshirt","down vest":"Daunenweste","winter":"Winter","summer":"Sommer","collection":"Kollektion","fashion":"Mode","classic":"Klassisch","vintage":"Vintage","graphic":"Grafik","monogram":"Monogramm","striped":"Streifen","stripes":"Streifen","embroidery":"bestickt","rib knit":"Rippstrick","half zip":"Halbreißverschluss","cross-body":"Crossbody","keychains":"Schlüsselanhänger","key chain":"Schlüsselanhänger","jewellery":"Schmuck","ties":"Krawatte","polo":"Poloshirt","downjacket":"Daunenjacke","down vests":"Daunenweste","hoodi":"Kapuzenpullover","cardholde":"Kartenetui","braclet":"Armband","braclets":"Armband","slacks":"Hose","zapatos":"Schuhe","colores":"Farben","earphone":"In-Ear-Kopfhörer","hoodies":"Kapuzenpullover","hooded sweatshirt":"Kapuzenpullover","hooded sweatshirts":"Kapuzenpullover","sudadera":"Sweatshirt","sudaderas":"Sweatshirt","sweatshirts":"Sweatshirt","sweaters":"Pullover","pullover":"Pullover","pullovers":"Pullover","t-shirts":"T-Shirt","t shirt":"T-Shirt","t shirts":"T-Shirt","tshirt":"T-Shirt","tshirts":"T-Shirt","tee":"T-Shirt","tees":"T-Shirt","shirts":"Hemd","jackets":"Jacke","down jackets":"Daunenjacke","puffer jackets":"Steppjacke","puffer":"Steppjacke","puffers":"Steppjacke","coats":"Mantel","windbreakers":"Windjacke","vests":"Weste","chaleco":"Weste","trousers":"Hose","pant":"Hose","joggers":"Jogginghose","jogger":"Jogginghose","sweat pants":"Jogginghose","sweatpant":"Jogginghose","jean":"Jeans","short":"kurz","tracksuits":"Trainingsanzug","track suit":"Trainingsanzug","track suits":"Trainingsanzug","sets":"Set","suits":"Set","suit":"Anzug","jerseys":"Trikot","sneaker":"Sneaker","shoe":"Schuhe","boot":"Stiefel","sandal":"Sandalen","slipper":"Hausschuhe","slides":"Hausschuhe","slide":"Badesandale","loafer":"Slipper","pump":"Pumps","bags":"Tasche","backpacks":"Rucksack","wallets":"Geldbörse","cardholder":"Kartenetui","cardholders":"Kartenetui","card holders":"Kartenetui","belts":"Gürtel","hats":"Hut","caps":"Kappe","baseball cap":"Kappe","baseball caps":"Kappe","beanies":"Strickmütze","scarves":"Schal","sock":"Socken","boxers":"Unterwäsche","sunglass":"Sonnenbrille","eyeglasses":"Brille","watches":"Armbanduhr","bracelets":"Armband","necklaces":"Halskette","earring":"Ohrringe","rings":"Ring","perfumes":"Parfüm","earphones":"In-Ear-Kopfhörer","speakers":"Lautsprecher","phone cases":"Handyhülle","style":"Varianten","color":"Farben","colours":"Farben","colour":"Farben","logos":"Logo","printed":"Print","prints":"Print","long-sleeve":"Langarm","long sleeved":"Langarm","long-sleeved":"Langarm","longsleeve":"Langarm","longsleeves":"Langarm","long sleeves":"Langarm","short-sleeve":"Kurzarm","short-sleeved":"Kurzarm","short sleeved":"Kurzarm","short sleeves":"Kurzarm","knitted":"Strick","knitwear":"Strick","zipper":"Reißverschluss","zip-up":"Reißverschluss","zip up":"Reißverschluss","gray":"Grau","low top":"niedriger Schaft","high top":"hoher Schaft","mens":"Herren","men's":"Herren","womens":"Damen","women's":"Damen","kids":"Kinder","children's":"Kinder","kid's":"Kinder","sportswear":"Sportbekleidung","new style":"neues Modell","new":"neu","and":"und","with":"mit","football":"Fußball","sleeve":"Ärmel","high quality":"hohe Qualität","best quality":"beste Qualität","quality":"Qualität","best":"beste","long":"lang","top":"Oberteil","heart":"Herz","cargo":"Cargo","flared":"ausgestellt","loose":"weit","beach":"Strand","waterproof":"wasserdicht","back print":"Rückenprint","letter":"Buchstabe","multi-colorway":"mehrere Farben","multicolor":"mehrfarbig","crewneck":"Rundhalsausschnitt","crew neck":"Rundhalsausschnitt","zippered":"mit Reißverschluss","patch":"Aufnäher","basic":"Basic","cotton blend":"Baumwollmischung","reversible":"wendbar","checked":"kariert","plaid":"kariert","buckle":"Schnalle","shoulder bag":"Schultertasche","crossbody bag":"Umhängetasche","baseball":"Baseball","basketball":"Basketball","outdoor":"Outdoor","sport":"Sport","sports":"Sport","velvet":"Samt","silk":"Seide","cashmere":"Kaschmir","fitted":"tailliert","slim":"schmal","wide leg":"weites Bein","embroidered logo":"gesticktes Logo","quilted":"gesteppt","drawstring":"Kordelzug","elastic":"elastisch","waist":"Taille","round neck":"Rundhalsausschnitt","outfit":"Outfit","designer":"Designer"},"fr":{"hoodie":"Sweat à capuche","sweatshirt":"Sweat-shirt","sweater":"Pull","t-shirt":"T-shirt","shirt":"Chemise","jacket":"Veste","down jacket":"Doudoune en duvet","puffer jacket":"Veste matelassée","coat":"Manteau","windbreaker":"Coupe-vent","vest":"Gilet","pants":"Pantalon","sweatpants":"Pantalon de jogging","jeans":"Jean","shorts":"Short","tracksuit":"Survêtement","set":"Ensemble","jersey":"Maillot","sneakers":"Baskets","shoes":"Chaussures","boots":"Bottes","sandals":"Sandales","slippers":"Chaussons","loafers":"Mocassins","pumps":"Escarpins","bag":"Sac","backpack":"Sac à dos","wallet":"Portefeuille","card holder":"Porte-cartes","belt":"Ceinture","hat":"Chapeau","cap":"Casquette","beanie":"Bonnet","scarf":"Écharpe","socks":"Chaussettes","underwear":"Sous-vêtements","sunglasses":"Lunettes de soleil","glasses":"Lunettes","watch":"Montre","bracelet":"Bracelet","necklace":"Collier","earrings":"Boucles d’oreilles","ring":"Bague","perfume":"Parfum","headphones":"Casque audio","earbuds":"Écouteurs","speaker":"Enceinte","phone case":"Coque de téléphone","styles":"modèles","colors":"couleurs","logo":"Logo","print":"Imprimé","long sleeve":"Manches longues","short sleeve":"Manches courtes","leather":"Cuir","cotton":"Coton","denim":"Denim","knit":"Maille","hooded":"À capuche","zip":"Fermeture éclair","black":"Noir","white":"Blanc","blue":"Bleu","red":"Rouge","pink":"Rose","green":"Vert","grey":"Gris","brown":"Marron","beige":"Beige","oversized":"Coupe ample","low-top":"Tige basse","high-top":"Tige haute","running":"Course","retro":"Rétro","casual":"Décontracté","men":"Homme","women":"Femme","children":"Enfant","wireless":"Sans fil","portable":"Portable","floral":"Fleuri","stripe":"Rayures","rainbow":"Arc-en-ciel","half-zip":"Demi-zip","fleece":"Polaire","embroidered":"Brodé","distressed":"Effet usé","ribbed":"Côtelé","mesh":"Maille filet","canvas":"Toile","wool":"Laine","suede":"Daim","crossbody":"Bandoulière","shoulder":"Épaule","tote":"Cabas","keychain":"Porte-clés","gloves":"Gants","tie":"Cravate","jewelry":"Bijoux","ski mask":"Cagoule de ski","polo shirt":"Polo","down vest":"Doudoune sans manches","winter":"Hiver","summer":"Été","collection":"Collection","fashion":"mode","classic":"Classique","vintage":"Vintage","graphic":"Motif graphique","monogram":"Monogramme","striped":"Rayures","stripes":"Rayures","embroidery":"Brodé","rib knit":"Côtelé","half zip":"Demi-zip","cross-body":"Bandoulière","keychains":"Porte-clés","key chain":"Porte-clés","jewellery":"Bijoux","ties":"Cravate","polo":"Polo","downjacket":"Doudoune en duvet","down vests":"Doudoune sans manches","hoodi":"Sweat à capuche","cardholde":"Porte-cartes","braclet":"Bracelet","braclets":"Bracelet","slacks":"Pantalon","zapatos":"Chaussures","colores":"couleurs","earphone":"Écouteurs","hoodies":"Sweat à capuche","hooded sweatshirt":"Sweat à capuche","hooded sweatshirts":"Sweat à capuche","sudadera":"Sweat-shirt","sudaderas":"Sweat-shirt","sweatshirts":"Sweat-shirt","sweaters":"Pull","pullover":"pull","pullovers":"Pull","t-shirts":"T-shirt","t shirt":"T-shirt","t shirts":"T-shirt","tshirt":"T-shirt","tshirts":"T-shirt","tee":"T-shirt","tees":"T-shirt","shirts":"Chemise","jackets":"Veste","down jackets":"Doudoune en duvet","puffer jackets":"Veste matelassée","puffer":"doudoune","puffers":"Veste matelassée","coats":"Manteau","windbreakers":"Coupe-vent","vests":"Gilet","chaleco":"Gilet","trousers":"Pantalon","pant":"Pantalon","joggers":"Pantalon de jogging","jogger":"Pantalon de jogging","sweat pants":"Pantalon de jogging","sweatpant":"Pantalon de jogging","jean":"Jean","short":"court","tracksuits":"Survêtement","track suit":"Survêtement","track suits":"Survêtement","sets":"Ensemble","suits":"Ensemble","suit":"ensemble","jerseys":"Maillot","sneaker":"Baskets","shoe":"Chaussures","boot":"Bottes","sandal":"Sandales","slipper":"Chaussons","slides":"Chaussons","slide":"claquette","loafer":"Mocassins","pump":"Escarpins","bags":"Sac","backpacks":"Sac à dos","wallets":"Portefeuille","cardholder":"Porte-cartes","cardholders":"Porte-cartes","card holders":"Porte-cartes","belts":"Ceinture","hats":"Chapeau","caps":"Casquette","baseball cap":"Casquette","baseball caps":"Casquette","beanies":"Bonnet","scarves":"Écharpe","sock":"Chaussettes","boxers":"Sous-vêtements","sunglass":"Lunettes de soleil","eyeglasses":"Lunettes","watches":"Montre","bracelets":"Bracelet","necklaces":"Collier","earring":"Boucles d’oreilles","rings":"Bague","perfumes":"Parfum","earphones":"Écouteurs","speakers":"Enceinte","phone cases":"Coque de téléphone","style":"modèles","color":"couleurs","colours":"couleurs","colour":"couleurs","logos":"Logo","printed":"Imprimé","prints":"Imprimé","long-sleeve":"Manches longues","long sleeved":"Manches longues","long-sleeved":"Manches longues","longsleeve":"Manches longues","longsleeves":"Manches longues","long sleeves":"Manches longues","short-sleeve":"Manches courtes","short-sleeved":"Manches courtes","short sleeved":"Manches courtes","short sleeves":"Manches courtes","knitted":"Maille","knitwear":"Maille","zipper":"Fermeture éclair","zip-up":"Fermeture éclair","zip up":"Fermeture éclair","gray":"Gris","low top":"Tige basse","high top":"Tige haute","mens":"Homme","men's":"Homme","womens":"Femme","women's":"Femme","kids":"Enfant","children's":"Enfant","kid's":"Enfant","sportswear":"vêtements de sport","new style":"nouveau modèle","new":"nouveau","and":"et","with":"avec","football":"football","sleeve":"manche","high quality":"haute qualité","best quality":"meilleure qualité","quality":"qualité","best":"meilleur","long":"long","top":"haut","heart":"cœur","cargo":"cargo","flared":"évasé","loose":"ample","beach":"plage","waterproof":"imperméable","back print":"imprimé au dos","letter":"lettre","multi-colorway":"plusieurs coloris","multicolor":"multicolore","crewneck":"col rond","crew neck":"col rond","zippered":"zippé","patch":"écusson","basic":"basique","cotton blend":"coton mélangé","reversible":"réversible","checked":"à carreaux","plaid":"à carreaux","buckle":"boucle","shoulder bag":"sac à épaule","crossbody bag":"sac bandoulière","baseball":"baseball","basketball":"basket-ball","outdoor":"plein air","sport":"sport","sports":"sport","velvet":"velours","silk":"soie","cashmere":"cachemire","fitted":"ajusté","slim":"ajusté","wide leg":"jambe large","embroidered logo":"logo brodé","quilted":"matelassé","drawstring":"cordon","elastic":"élastique","waist":"taille","round neck":"col rond","outfit":"tenue","designer":"créateur"},"es":{"hoodie":"Sudadera con capucha","sweatshirt":"Sudadera","sweater":"Jersey de punto","t-shirt":"Camiseta","shirt":"Camisa","jacket":"Chaqueta","down jacket":"Chaqueta de plumón","puffer jacket":"Chaqueta acolchada","coat":"Abrigo","windbreaker":"Cortavientos","vest":"Chaleco","pants":"Pantalones","sweatpants":"Pantalones de chándal","jeans":"Vaqueros","shorts":"Pantalones cortos","tracksuit":"Chándal","set":"Conjunto","jersey":"Camiseta deportiva","sneakers":"Zapatillas","shoes":"Zapatos","boots":"Botas","sandals":"Sandalias","slippers":"Zapatillas de casa","loafers":"Mocasines","pumps":"Zapatos de tacón","bag":"Bolso","backpack":"Mochila","wallet":"Cartera","card holder":"Tarjetero","belt":"Cinturón","hat":"Sombrero","cap":"Gorra","beanie":"Gorro","scarf":"Bufanda","socks":"Calcetines","underwear":"Ropa interior","sunglasses":"Gafas de sol","glasses":"Gafas","watch":"Reloj","bracelet":"Pulsera","necklace":"Collar","earrings":"Pendientes","ring":"Anillo","perfume":"Perfume","headphones":"Auriculares de diadema","earbuds":"Auriculares intraurales","speaker":"Altavoz","phone case":"Funda de móvil","styles":"modelos","colors":"colores","logo":"Logotipo","print":"Estampado","long sleeve":"Manga larga","short sleeve":"Manga corta","leather":"Cuero","cotton":"Algodón","denim":"Tejido vaquero","knit":"Punto","hooded":"Con capucha","zip":"Cremallera","black":"Negro","white":"Blanco","blue":"Azul","red":"Rojo","pink":"Rosa","green":"Verde","grey":"Gris","brown":"Marrón","beige":"Beige","oversized":"Corte holgado","low-top":"Caña baja","high-top":"Caña alta","running":"Running","retro":"Retro","casual":"Informal","men":"Hombre","women":"Mujer","children":"Niños","wireless":"Inalámbrico","portable":"Portátil","floral":"Floral","stripe":"Rayas","rainbow":"Arcoíris","half-zip":"Media cremallera","fleece":"Forro polar","embroidered":"Bordado","distressed":"Efecto desgastado","ribbed":"Canalé","mesh":"Malla","canvas":"Lona","wool":"Lana","suede":"Ante","crossbody":"Bandolera","shoulder":"Hombro","tote":"Tote","keychain":"Llavero","gloves":"Guantes","tie":"Corbata","jewelry":"Joyería","ski mask":"Pasamontañas","polo shirt":"Polo","down vest":"Chaleco de plumón","winter":"Invierno","summer":"Verano","collection":"Colección","fashion":"moda","classic":"Clásico","vintage":"Vintage","graphic":"Gráfico","monogram":"Monograma","striped":"Rayas","stripes":"Rayas","embroidery":"Bordado","rib knit":"Canalé","half zip":"Media cremallera","cross-body":"Bandolera","keychains":"Llavero","key chain":"Llavero","jewellery":"Joyería","ties":"Corbata","polo":"Polo","downjacket":"Chaqueta de plumón","down vests":"Chaleco de plumón","hoodi":"Sudadera con capucha","cardholde":"Tarjetero","braclet":"Pulsera","braclets":"Pulsera","slacks":"Pantalones","zapatos":"Zapatos","colores":"colores","earphone":"Auriculares intraurales","hoodies":"Sudadera con capucha","hooded sweatshirt":"Sudadera con capucha","hooded sweatshirts":"Sudadera con capucha","sudadera":"Sudadera","sudaderas":"Sudadera","sweatshirts":"Sudadera","sweaters":"Jersey de punto","pullover":"jersey","pullovers":"Jersey de punto","t-shirts":"Camiseta","t shirt":"Camiseta","t shirts":"Camiseta","tshirt":"Camiseta","tshirts":"Camiseta","tee":"Camiseta","tees":"Camiseta","shirts":"Camisa","jackets":"Chaqueta","down jackets":"Chaqueta de plumón","puffer jackets":"Chaqueta acolchada","puffer":"chaqueta acolchada","puffers":"Chaqueta acolchada","coats":"Abrigo","windbreakers":"Cortavientos","vests":"Chaleco","chaleco":"Chaleco","trousers":"Pantalones","pant":"Pantalones","joggers":"Pantalones de chándal","jogger":"Pantalones de chándal","sweat pants":"Pantalones de chándal","sweatpant":"Pantalones de chándal","jean":"Vaqueros","short":"corto","tracksuits":"Chándal","track suit":"Chándal","track suits":"Chándal","sets":"Conjunto","suits":"Conjunto","suit":"conjunto","jerseys":"Camiseta deportiva","sneaker":"Zapatillas","shoe":"Zapatos","boot":"Botas","sandal":"Sandalias","slipper":"Zapatillas de casa","slides":"Zapatillas de casa","slide":"sandalia","loafer":"Mocasines","pump":"Zapatos de tacón","bags":"Bolso","backpacks":"Mochila","wallets":"Cartera","cardholder":"Tarjetero","cardholders":"Tarjetero","card holders":"Tarjetero","belts":"Cinturón","hats":"Sombrero","caps":"Gorra","baseball cap":"Gorra","baseball caps":"Gorra","beanies":"Gorro","scarves":"Bufanda","sock":"Calcetines","boxers":"Ropa interior","sunglass":"Gafas de sol","eyeglasses":"Gafas","watches":"Reloj","bracelets":"Pulsera","necklaces":"Collar","earring":"Pendientes","rings":"Anillo","perfumes":"Perfume","earphones":"Auriculares intraurales","speakers":"Altavoz","phone cases":"Funda de móvil","style":"modelos","color":"colores","colours":"colores","colour":"colores","logos":"Logotipo","printed":"Estampado","prints":"Estampado","long-sleeve":"Manga larga","long sleeved":"Manga larga","long-sleeved":"Manga larga","longsleeve":"Manga larga","longsleeves":"Manga larga","long sleeves":"Manga larga","short-sleeve":"Manga corta","short-sleeved":"Manga corta","short sleeved":"Manga corta","short sleeves":"Manga corta","knitted":"Punto","knitwear":"Punto","zipper":"Cremallera","zip-up":"Cremallera","zip up":"Cremallera","gray":"Gris","low top":"Caña baja","high top":"Caña alta","mens":"Hombre","men's":"Hombre","womens":"Mujer","women's":"Mujer","kids":"Niños","children's":"Niños","kid's":"Niños","sportswear":"ropa deportiva","new style":"nuevo modelo","new":"nuevo","and":"y","with":"con","football":"fútbol","sleeve":"manga","high quality":"alta calidad","best quality":"mejor calidad","quality":"calidad","best":"mejor","long":"largo","top":"top","heart":"corazón","cargo":"cargo","flared":"acampanado","loose":"holgado","beach":"playa","waterproof":"impermeable","back print":"estampado trasero","letter":"letra","multi-colorway":"varios colores","multicolor":"multicolor","crewneck":"cuello redondo","crew neck":"cuello redondo","zippered":"con cremallera","patch":"parche","basic":"básico","cotton blend":"mezcla de algodón","reversible":"reversible","checked":"a cuadros","plaid":"a cuadros","buckle":"hebilla","shoulder bag":"bolso de hombro","crossbody bag":"bolso cruzado","baseball":"béisbol","basketball":"baloncesto","outdoor":"aire libre","sport":"deporte","sports":"deporte","velvet":"terciopelo","silk":"seda","cashmere":"cachemira","fitted":"entallado","slim":"ajustado","wide leg":"pierna ancha","embroidered logo":"logotipo bordado","quilted":"acolchado","drawstring":"cordón","elastic":"elástico","waist":"cintura","round neck":"cuello redondo","outfit":"conjunto","designer":"diseñador"},"it":{"hoodie":"Felpa con cappuccio","sweatshirt":"Felpa","sweater":"Maglione","t-shirt":"T-shirt","shirt":"Camicia","jacket":"Giacca","down jacket":"Piumino","puffer jacket":"Giacca imbottita","coat":"Cappotto","windbreaker":"Giacca a vento","vest":"Gilet","pants":"Pantaloni","sweatpants":"Pantaloni da jogging","jeans":"Jeans","shorts":"Pantaloncini","tracksuit":"Tuta","set":"Completo","jersey":"Maglia sportiva","sneakers":"Sneakers","shoes":"Scarpe","boots":"Stivali","sandals":"Sandali","slippers":"Pantofole","loafers":"Mocassini","pumps":"Décolleté","bag":"Borsa","backpack":"Zaino","wallet":"Portafoglio","card holder":"Portacarte","belt":"Cintura","hat":"Cappello","cap":"Cappellino","beanie":"Berretto","scarf":"Sciarpa","socks":"Calzini","underwear":"Intimo","sunglasses":"Occhiali da sole","glasses":"Occhiali","watch":"Orologio","bracelet":"Bracciale","necklace":"Collana","earrings":"Orecchini","ring":"Anello","perfume":"Profumo","headphones":"Cuffie","earbuds":"Auricolari","speaker":"Altoparlante","phone case":"Custodia per telefono","styles":"modelli","colors":"colori","logo":"Logo","print":"Stampa","long sleeve":"Maniche lunghe","short sleeve":"Maniche corte","leather":"Pelle","cotton":"Cotone","denim":"Denim","knit":"Maglia","hooded":"Con cappuccio","zip":"Zip","black":"Nero","white":"Bianco","blue":"Blu","red":"Rosso","pink":"Rosa","green":"Verde","grey":"Grigio","brown":"Marrone","beige":"Beige","oversized":"Vestibilità ampia","low-top":"Basso","high-top":"Alto","running":"Corsa","retro":"Retrò","casual":"Casual","men":"Uomo","women":"Donna","children":"Bambini","wireless":"Senza fili","portable":"Portatile","floral":"Floreale","stripe":"Righe","rainbow":"Arcobaleno","half-zip":"Mezza zip","fleece":"Pile","embroidered":"Ricamato","distressed":"Effetto consumato","ribbed":"A coste","mesh":"Rete","canvas":"Tela","wool":"Lana","suede":"Camoscio","crossbody":"Tracolla","shoulder":"Spalla","tote":"Tote","keychain":"Portachiavi","gloves":"Guanti","tie":"Cravatta","jewelry":"Gioielli","ski mask":"Passamontagna","polo shirt":"Polo","down vest":"Gilet in piuma","winter":"Inverno","summer":"Estate","collection":"Collezione","fashion":"moda","classic":"Classico","vintage":"Vintage","graphic":"Grafica","monogram":"Monogramma","striped":"Righe","stripes":"Righe","embroidery":"Ricamato","rib knit":"A coste","half zip":"Mezza zip","cross-body":"Tracolla","keychains":"Portachiavi","key chain":"Portachiavi","jewellery":"Gioielli","ties":"Cravatta","polo":"Polo","downjacket":"Piumino","down vests":"Gilet in piuma","hoodi":"Felpa con cappuccio","cardholde":"Portacarte","braclet":"Bracciale","braclets":"Bracciale","slacks":"Pantaloni","zapatos":"Scarpe","colores":"colori","earphone":"Auricolari","hoodies":"Felpa con cappuccio","hooded sweatshirt":"Felpa con cappuccio","hooded sweatshirts":"Felpa con cappuccio","sudadera":"Felpa","sudaderas":"Felpa","sweatshirts":"Felpa","sweaters":"Maglione","pullover":"pullover","pullovers":"Maglione","t-shirts":"T-shirt","t shirt":"T-shirt","t shirts":"T-shirt","tshirt":"T-shirt","tshirts":"T-shirt","tee":"T-shirt","tees":"T-shirt","shirts":"Camicia","jackets":"Giacca","down jackets":"Piumino","puffer jackets":"Giacca imbottita","puffer":"piumino","puffers":"Giacca imbottita","coats":"Cappotto","windbreakers":"Giacca a vento","vests":"Gilet","chaleco":"Gilet","trousers":"Pantaloni","pant":"Pantaloni","joggers":"Pantaloni da jogging","jogger":"Pantaloni da jogging","sweat pants":"Pantaloni da jogging","sweatpant":"Pantaloni da jogging","jean":"Jeans","short":"corto","tracksuits":"Tuta","track suit":"Tuta","track suits":"Tuta","sets":"Completo","suits":"Completo","suit":"completo","jerseys":"Maglia sportiva","sneaker":"Sneakers","shoe":"Scarpe","boot":"Stivali","sandal":"Sandali","slipper":"Pantofole","slides":"Pantofole","slide":"ciabatta","loafer":"Mocassini","pump":"Décolleté","bags":"Borsa","backpacks":"Zaino","wallets":"Portafoglio","cardholder":"Portacarte","cardholders":"Portacarte","card holders":"Portacarte","belts":"Cintura","hats":"Cappello","caps":"Cappellino","baseball cap":"Cappellino","baseball caps":"Cappellino","beanies":"Berretto","scarves":"Sciarpa","sock":"Calzini","boxers":"Intimo","sunglass":"Occhiali da sole","eyeglasses":"Occhiali","watches":"Orologio","bracelets":"Bracciale","necklaces":"Collana","earring":"Orecchini","rings":"Anello","perfumes":"Profumo","earphones":"Auricolari","speakers":"Altoparlante","phone cases":"Custodia per telefono","style":"modelli","color":"colori","colours":"colori","colour":"colori","logos":"Logo","printed":"Stampa","prints":"Stampa","long-sleeve":"Maniche lunghe","long sleeved":"Maniche lunghe","long-sleeved":"Maniche lunghe","longsleeve":"Maniche lunghe","longsleeves":"Maniche lunghe","long sleeves":"Maniche lunghe","short-sleeve":"Maniche corte","short-sleeved":"Maniche corte","short sleeved":"Maniche corte","short sleeves":"Maniche corte","knitted":"Maglia","knitwear":"Maglia","zipper":"Zip","zip-up":"Zip","zip up":"Zip","gray":"Grigio","low top":"Basso","high top":"Alto","mens":"Uomo","men's":"Uomo","womens":"Donna","women's":"Donna","kids":"Bambini","children's":"Bambini","kid's":"Bambini","sportswear":"abbigliamento sportivo","new style":"nuovo modello","new":"nuovo","and":"e","with":"con","football":"calcio","sleeve":"manica","high quality":"alta qualità","best quality":"migliore qualità","quality":"qualità","best":"migliore","long":"lungo","top":"top","heart":"cuore","cargo":"cargo","flared":"svasato","loose":"ampio","beach":"spiaggia","waterproof":"impermeabile","back print":"stampa sul retro","letter":"lettera","multi-colorway":"più colori","multicolor":"multicolore","crewneck":"girocollo","crew neck":"girocollo","zippered":"con zip","patch":"toppa","basic":"base","cotton blend":"misto cotone","reversible":"reversibile","checked":"a quadri","plaid":"a quadri","buckle":"fibbia","shoulder bag":"borsa a spalla","crossbody bag":"borsa a tracolla","baseball":"baseball","basketball":"pallacanestro","outdoor":"outdoor","sport":"sport","sports":"sport","velvet":"velluto","silk":"seta","cashmere":"cashmere","fitted":"aderente","slim":"slim","wide leg":"gamba larga","embroidered logo":"logo ricamato","quilted":"trapuntato","drawstring":"coulisse","elastic":"elastico","waist":"vita","round neck":"girocollo","outfit":"completo","designer":"stilista"},"zh":{"hoodie":"连帽卫衣","sweatshirt":"卫衣","sweater":"毛衣","t-shirt":"T恤","shirt":"衬衫","jacket":"夹克","down jacket":"羽绒夹克","puffer jacket":"绗缝棉服","coat":"外套","windbreaker":"防风夹克","vest":"背心","pants":"长裤","sweatpants":"运动裤","jeans":"牛仔裤","shorts":"短裤","tracksuit":"运动套装","set":"套装","jersey":"球衣","sneakers":"运动鞋","shoes":"鞋履","boots":"靴子","sandals":"凉鞋","slippers":"拖鞋","loafers":"乐福鞋","pumps":"高跟鞋","bag":"包袋","backpack":"双肩包","wallet":"钱包","card holder":"卡包","belt":"腰带","hat":"帽子","cap":"棒球帽","beanie":"针织帽","scarf":"围巾","socks":"袜子","underwear":"内衣","sunglasses":"太阳镜","glasses":"眼镜","watch":"手表","bracelet":"手链","necklace":"项链","earrings":"耳环","ring":"戒指","perfume":"香水","headphones":"头戴式耳机","earbuds":"入耳式耳机","speaker":"音箱","phone case":"手机壳","styles":"款式","colors":"颜色","logo":"标志","print":"印花","long sleeve":"长袖","short sleeve":"短袖","leather":"皮革","cotton":"棉质","denim":"牛仔布","knit":"针织","hooded":"连帽","zip":"拉链","black":"黑色","white":"白色","blue":"蓝色","red":"红色","pink":"粉色","green":"绿色","grey":"灰色","brown":"棕色","beige":"米色","oversized":"宽松版型","low-top":"低帮","high-top":"高帮","running":"跑步","retro":"复古","casual":"休闲","men":"男款","women":"女款","children":"儿童款","wireless":"无线","portable":"便携","floral":"花卉","stripe":"条纹","rainbow":"彩虹","half-zip":"半拉链","fleece":"抓绒","embroidered":"刺绣","distressed":"做旧","ribbed":"罗纹","mesh":"网布","canvas":"帆布","wool":"羊毛","suede":"绒面革","crossbody":"斜挎","shoulder":"单肩","tote":"托特","keychain":"钥匙扣","gloves":"手套","tie":"领带","jewelry":"首饰","ski mask":"滑雪面罩","polo shirt":"Polo衫","down vest":"羽绒背心","winter":"冬季","summer":"夏季","collection":"系列","fashion":"时尚","classic":"经典","vintage":"复古","graphic":"图案","monogram":"字母花纹","striped":"条纹","stripes":"条纹","embroidery":"刺绣","rib knit":"罗纹","half zip":"半拉链","cross-body":"斜挎","keychains":"钥匙扣","key chain":"钥匙扣","jewellery":"首饰","ties":"领带","polo":"Polo衫","downjacket":"羽绒夹克","down vests":"羽绒背心","hoodi":"连帽卫衣","cardholde":"卡包","braclet":"手链","braclets":"手链","slacks":"长裤","zapatos":"鞋履","colores":"颜色","earphone":"入耳式耳机","hoodies":"连帽卫衣","hooded sweatshirt":"连帽卫衣","hooded sweatshirts":"连帽卫衣","sudadera":"卫衣","sudaderas":"卫衣","sweatshirts":"卫衣","sweaters":"毛衣","pullover":"套头衫","pullovers":"毛衣","t-shirts":"T恤","t shirt":"T恤","t shirts":"T恤","tshirt":"T恤","tshirts":"T恤","tee":"T恤","tees":"T恤","shirts":"衬衫","jackets":"夹克","down jackets":"羽绒夹克","puffer jackets":"绗缝棉服","puffer":"绗缝外套","puffers":"绗缝棉服","coats":"外套","windbreakers":"防风夹克","vests":"背心","chaleco":"背心","trousers":"长裤","pant":"长裤","joggers":"运动裤","jogger":"运动裤","sweat pants":"运动裤","sweatpant":"运动裤","jean":"牛仔裤","short":"短款","tracksuits":"运动套装","track suit":"运动套装","track suits":"运动套装","sets":"套装","suits":"套装","suit":"套装","jerseys":"球衣","sneaker":"运动鞋","shoe":"鞋履","boot":"靴子","sandal":"凉鞋","slipper":"拖鞋","slides":"拖鞋","slide":"拖鞋","loafer":"乐福鞋","pump":"高跟鞋","bags":"包袋","backpacks":"双肩包","wallets":"钱包","cardholder":"卡包","cardholders":"卡包","card holders":"卡包","belts":"腰带","hats":"帽子","caps":"棒球帽","baseball cap":"棒球帽","baseball caps":"棒球帽","beanies":"针织帽","scarves":"围巾","sock":"袜子","boxers":"内衣","sunglass":"太阳镜","eyeglasses":"眼镜","watches":"手表","bracelets":"手链","necklaces":"项链","earring":"耳环","rings":"戒指","perfumes":"香水","earphones":"入耳式耳机","speakers":"音箱","phone cases":"手机壳","style":"款式","color":"颜色","colours":"颜色","colour":"颜色","logos":"标志","printed":"印花","prints":"印花","long-sleeve":"长袖","long sleeved":"长袖","long-sleeved":"长袖","longsleeve":"长袖","longsleeves":"长袖","long sleeves":"长袖","short-sleeve":"短袖","short-sleeved":"短袖","short sleeved":"短袖","short sleeves":"短袖","knitted":"针织","knitwear":"针织","zipper":"拉链","zip-up":"拉链","zip up":"拉链","gray":"灰色","low top":"低帮","high top":"高帮","mens":"男款","men's":"男款","womens":"女款","women's":"女款","kids":"儿童款","children's":"儿童款","kid's":"儿童款","sportswear":"运动服","new style":"新款","new":"新款","and":"与","with":"搭配","football":"足球","sleeve":"衣袖","high quality":"高品质","best quality":"优质","quality":"品质","best":"优选","long":"长款","top":"上衣","heart":"爱心","cargo":"工装","flared":"喇叭版型","loose":"宽松","beach":"沙滩","waterproof":"防水","back print":"背部印花","letter":"字母","multi-colorway":"多配色","multicolor":"多色","crewneck":"圆领","crew neck":"圆领","zippered":"拉链款","patch":"贴布","basic":"基础款","cotton blend":"混纺棉","reversible":"双面","checked":"格纹","plaid":"格纹","buckle":"搭扣","shoulder bag":"单肩包","crossbody bag":"斜挎包","baseball":"棒球","basketball":"篮球","outdoor":"户外","sport":"运动","sports":"运动","velvet":"天鹅绒","silk":"丝绸","cashmere":"羊绒","fitted":"修身","slim":"修身","wide leg":"阔腿","embroidered logo":"刺绣标志","quilted":"绗缝","drawstring":"抽绳","elastic":"弹力","waist":"腰部","round neck":"圆领","outfit":"套装","designer":"设计师"}};
const extraRows = [
 ['rain jacket,rain jackets,raincoat,raincoats','Rain jacket','Regenjacke','Chaqueta impermeable','Veste de pluie','Giacca antipioggia','Kurtka przeciwdeszczowa','Jaqueta de chuva','雨衣','Regenjas','Geacă de ploaie','Regnjacka','Regnjakke','Sadetakki','Αδιάβροχο μπουφάν','Nepromokavá bunda','Esőkabát','Дъждобран','Pršiplášť','Kišna jakna','レインジャケット','레인 재킷','Áo khoác đi mưa','เสื้อกันฝน','Jaket hujan'],
 ['waterproof','Waterproof','Wasserdicht','Impermeable','Imperméable','Impermeabile','Wodoodporne','Impermeável','防水','Waterdicht','Impermeabil','Vattentät','Vandtæt','Vedenpitävä','Αδιάβροχο','Voděodolné','Vízálló','Водоустойчиво','Vodoodolné','Vodootporno','防水','방수','Chống nước','กันน้ำ','Tahan air'],
 ['leather','Leather','Leder','Cuero','Cuir','Pelle','Skóra','Couro','皮革','Leer','Piele','Läder','Læder','Nahka','Δέρμα','Kůže','Bőr','Кожа','Koža','Koža','レザー','가죽','Da','หนัง','Kulit'],
 ['key fob,key chain,keychain','Key ring','Schlüsselanhänger','Llavero','Porte-clés','Portachiavi','Brelok','Chaveiro','钥匙扣','Sleutelhanger','Breloc','Nyckelring','Nøglering','Avaimenperä','Μπρελόκ','Klíčenka','Kulcstartó','Ключодържател','Kľúčenka','Privjesak za ključeve','キーホルダー','열쇠고리','Móc khóa','พวงกุญแจ','Gantungan kunci']
];
for(const row of `
briefcase,briefcases|Briefcase|Aktentasche|Maletín|Porte-documents|Valigetta|Aktówka|Pasta executiva|公文包|Aktetas|Servietă|Portfölj|Dokumentmappe|Salkku|Χαρτοφύλακας|Aktovka|Aktatáska|Куфарче|Aktovka|Aktovka|ブリーフケース|서류 가방|Cặp tài liệu|กระเป๋าเอกสาร|Tas kerja
toiletry bag,wash bag|Toiletry bag|Kulturbeutel|Neceser|Trousse de toilette|Beauty case|Kosmetyczka|Nécessaire|洗漱包|Toilettas|Trusă de toaletă|Necessär|Toilettaske|Toalettipussi|Νεσεσέρ|Kosmetická taška|Neszesszer|Несесер|Kozmetická taška|Toaletna torbica|洗面用ポーチ|세면도구 가방|Túi đựng đồ vệ sinh|กระเป๋าใส่ของใช้ส่วนตัว|Tas perlengkapan mandi
tote,tote bag|Tote bag|Tragetasche|Bolso tote|Cabas|Borsa tote|Torba shopper|Bolsa tote|托特包|Shopper|Geantă tote|Tygkasse|Shopper|Kantokassi|Τσάντα tote|Nákupní taška|Bevásárlótáska|Чанта тип шопър|Nákupná taška|Torba za kupnju|トートバッグ|토트백|Túi tote|กระเป๋าโท้ท|Tas jinjing
boxing gloves,guantes boxeo,guantes de boxeo|Boxing gloves|Boxhandschuhe|Guantes de boxeo|Gants de boxe|Guantoni da boxe|Rękawice bokserskie|Luvas de boxe|拳击手套|Bokshandschoenen|Mănuși de box|Boxningshandskar|Boksehandsker|Nyrkkeilyhanskat|Γάντια πυγμαχίας|Boxerské rukavice|Bokszkesztyű|Боксови ръкавици|Boxerské rukavice|Boksačke rukavice|ボクシンググローブ|권투 글러브|Găng tay đấm bốc|นวมชกมวย|Sarung tinju
loafer,loafers,mocassino,mocassini|Loafers|Slipper|Mocasines|Mocassins|Mocassini|Mokasyny|Mocassins|乐福鞋|Loafers|Mocasini|Loafers|Loafers|Loaferit|Μοκασίνια|Mokasíny|Mokaszin|Мокасини|Mokasíny|Mokasinke|ローファー|로퍼|Giày lười|รองเท้าโลฟเฟอร์|Sepatu loafer
and|and|und|y|et|e|i|e|和|en|și|och|og|ja|και|a|és|и|a|i|＆|및|và|และ|dan
`.trim().split('\n')) extraRows.push(row.split('|'));
const englishAliases = {
 'cellphone case':'phone case','cell phone case':'phone case','phone cover':'phone case',
 't-shirt tee':'t-shirt','tee shirt':'t-shirt','hooded sweater':'hoodie',
 'running shoe':'running shoes','size options':'size','tyle':'styles'
};
const chineseAliases = {
 '码':'size','碼':'size','条纹':'striped','條紋':'striped','棉质':'cotton','棉質':'cotton','长袖':'long sleeve','短袖':'short sleeve','圆领':'crew neck','圓領':'crew neck','新款式':'new style','男鞋':'men’s shoes','女鞋':'women’s shoes','厚底鞋':'platform shoes','跑步鞋':'running shoes','运动鞋':'sneakers','運動鞋':'sneakers','跑鞋':'running shoes',
 '休闲鞋':'casual shoes','休閒鞋':'casual shoes','夹克衫':'jacket','夾克':'jacket','外套':'coat',
 '帽衫':'hoodie','联名':'×','聯名':'×','新款':'new','耐克':'Nike','阿迪达斯':'Adidas','阿迪達斯':'Adidas',
 '路易威登':'Louis Vuitton','路易·威登':'Louis Vuitton','天伯伦':'Timberland','古驰':'Gucci','香奈儿':'Chanel',
 '普拉达':'Prada','迪奥':'Dior','北面':'The North Face','巴黎世家':'Balenciaga','始祖鸟':'Arc’teryx','黑白':'black / white'
};
const brandWords=[...protectedNames,...'Louis Vuitton|Polo Ralph Lauren|Ralph Lauren|Alexander McQueen|The North Face|Timberland|Nike|Adidas|Moncler|Gucci|Salomon|Casablanca|Breitling|Dior|Fendi|Prada|Burberry|Cole Buxton|Air Zoom Pegasus|Air Force 1|Air Jordan|New Balances|New Balance|Balmain|Amiri|Purple Brand|Chanel|Saint Laurent|Hermès|Hermes|Rick Owens|Chrome Hearts|Under Armour|Celine|Loewe|Bottega Veneta|Versace|Givenchy|Supreme|Stussy|Corteiz|Carhartt|Hellstar|Essentials|Yeezy|Jordan|Asics|Onitsuka|UGG|Crocs|Puma|Reebok|Converse|Vans|Hoka|Coach|Goyard|Rolex|Omega|Cartier|Casio|Apple|Samsung|Dyson|Sony|JBL|Bose|Kenzo|Marni|Diesel|Bape|Balenciaga|Christian Louboutin|Arc’teryx|Alo|C.P. Company|Maison Margiela|Air Zoom|Pegasus|Lacoste|Valentino|Venum|Vlone|Diesel|Palm Angels|Rick O*ens|Hermes|Loewe|Christian Dior|Calvin Klein|Tommy Hilfiger|Marc Jacobs|ON Running|Bapesta|Bape|6pm|Louis Vuitton|LV|TNF|YSL|CDG'.split('|')];
const brandPattern=wordPattern(brandWords);
const brandSet=new Set(brandWords.map(s=>s.toLowerCase()));
const dictionaries=new Map();
const chineseToEnglish=new Map();
for(const [aliases,...labels] of [...titleRows,...extraRows]){
 if(labels[7]&&/\p{Script=Han}/u.test(labels[7]))chineseToEnglish.set(labels[7],aliases.split(',')[0]);
}
for(const [en,zh] of Object.entries(expandedTerms.zh)) if(zh)chineseToEnglish.set(zh,en);
for(const [chinese,en] of skuRows) for(const key of chinese.split('|')) chineseToEnglish.set(key,en);
for(const [chinese,en] of Object.entries(chineseAliases)) chineseToEnglish.set(chinese,en);
const chinesePattern=new RegExp([...chineseToEnglish.keys()].sort((a,b)=>b.length-a.length).map(escapeRegExp).join('|'),'gu');
function normalize(name) {
 return String(name??'').normalize('NFKC').replace(/(?<=\d)(?=shoes?\b)/gi,' ').replace(/\s+/g,' ').trim();
}
function fromChinese(value){
 return value.replace(/(\d+(?:[./-]\d+)*)(?:码|碼)/g,' size $1 ').replace(chinesePattern,word=>' '+chineseToEnglish.get(word)+' ').replace(/\s+/g,' ').trim();
}
function glossary(lang){
 if(dictionaries.has(lang))return dictionaries.get(lang);
 const i=codes.indexOf(lang);
 const words=new Map();
 for(const [aliases,...labels] of titleRows){
   const translation=labels[i]||aliases.split(',').map(alias=>catalogWords[lang]?.get(alias)).find(Boolean);
   if(translation)for(const k of aliases.split(','))words.set(k,translation);
 }
 for(const [key,value] of Object.entries(expandedTerms[lang]||{}))words.set(key,value);
 for(const [key,value] of catalogWords[lang]||[]) words.set(key,value);
 for(const row of terms) if(row[i]) words.set(row[0].toLowerCase(),row[i]);
 for(const [,en,...labels] of skuRows){
   const tr=i===0?en:labels[i-1]||catalogWords[lang]?.get(en.toLowerCase());
   if(tr)words.set(en.toLowerCase(),tr);
 }
 for(const [aliases,...labels] of extraRows)for(const word of aliases.split(','))words.set(word,labels[i]);
 for(const [alias,word] of Object.entries(englishAliases))words.set(alias,words.get(word)||word);
 const reverse=new Map();
 for(const [word,label] of words)if(!reverse.has(label.toLowerCase()))reverse.set(label.toLowerCase(),word);
 const entry={words,reverse,regex:wordPattern([...words.keys(),...brandWords]),inverse:wordPattern([...reverse.keys(),...brandWords])};
 dictionaries.set(lang,entry);
 return entry;
}
const categoryTerms={'shoes':'shoes','hoodies-sweaters':'sweatshirts','t-shirts':'t-shirts','jackets':'jackets','headwear':'headwear','accessories':'accessories','short-sets':'sets','electronics':'electronics','jersey':'jerseys'};
const cache=new Map();
function localProductName(raw, lang='en', path=''){
 const value=normalize(raw);
 if(!value)return '';
 if(!codes.includes(lang))lang='en';
 const cached=cache.get(lang+'|'+value);
 if(cached)return cached;
 const dictionary=glossary(lang);
 const source=lang==='zh'?value:fromChinese(value);
 const result=source.replace(dictionary.regex,(term,offset)=>{
   const key=term.toLowerCase();
   if(brandSet.has(key)||(key==='purple'&&source.slice(0,offset).endsWith('/')&&source[offset+term.length]==='/'))return term;
   if(lang==='en'&&!englishAliases[key]&&!/^(?:guantes (?:de )?boxeo|mocassino|mocassini|sudaderas?|camisetas?|zapatos|zapatillas|bolsos?|cartera|cinturón|brazalete|reloj|gorra|chaleco|estilos|colores)$/.test(key))return term;
   return dictionary.words.get(key)||term;
 });
 const base=result.replace(/\s+([),;])/g,'$1').trim();
 // Some sellers list only a collaboration or brand. Use the source category to
 // give it a readable local description while retaining every brand and model.
 if(lang!=='en' && path && base===value){
   const identity=maskPublicTitle(value);
   const remainder=identity.masked.replace(/ZXQ\d+QXZ/g,'').replace(/\bx\b/gi,'');
   if(identity.kept.length && !/\p{L}/u.test(remainder)){
     const category=String(path).split('/').find(part=>Object.hasOwn(categoryTerms,part));
     const translated=category && dictionary.words.get(categoryTerms[category]);
     if(translated)return base+' · '+translated;
   }
 }
 return base;
}
function localProductOption(raw,lang){
 return localProductName(raw,lang);
}
function localSourceQuery(input,lang='en'){
 const value=normalize(input);
 if(!codes.includes(lang)||lang==='en'||/^\d+$/.test(value))return value;
 if(lang==='zh')return fromChinese(value);
 const {reverse,inverse}=glossary(lang);
 return value.replace(inverse,m=>brandSet.has(m.toLowerCase())?m:reverse.get(m.toLowerCase())||m);
}
function maskPublicTitle(value) {
 const kept=[];
 const masked=value.replace(brandPattern,word=>{kept.push(word);return ' ZXQ'+kept.length+'QXZ '})
 .replace(/\b(?!ZXQ\d+QXZ\b)(?=[\w./-]*[0-9])(?=[\w./-]*[a-zA-Z])[\w./-]+\b/g,word=>{kept.push(word);return ' ZXQ'+kept.length+'QXZ '});
 return {masked:masked.replace(/\s+/g,' ').trim(),kept};
}
function translateResult(row,line,lang){
 if(typeof line!=='string'||!line.trim())return false;
 // Translators sometimes insert spaces around placeholders or change their case.
 const normalized=line.normalize('NFKC').replace(/ZXQ\s*(\d+)\s*QXZ/gi,'ZXQ$1QXZ');
 if(row.kept.some((_,i)=>!normalized.includes('ZXQ'+(i+1)+'QXZ')))return false;
 const value=normalized.replace(/ZXQ(\d+)QXZ/g,(_,i)=>row.kept[Number(i)-1]??'').trim();
 if(!value||(!['zh','ja'].includes(lang)&&/\p{Script=Han}/u.test(value)))return false;
 if(cache.size>=12000)cache.delete(cache.keys().next().value);
 cache.set(lang+'|'+row.value,value);
 return true;
}
async function translateGroup(group,lang,host,timeout){
 const query=new URLSearchParams({client:'dict-chrome-ex',sl:'auto',tl:lang==='zh'?'zh-CN':lang});
 // Separate q entries preserve title boundaries and detect the source language
 // independently for English, Chinese and other seller titles on the same page.
 for(const row of group)query.append('q',row.masked);
 try{
   const r=await fetch(host+'/translate_a/t?'+query,{
     signal:AbortSignal.timeout(timeout),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':86400,'400-599':0}}});
   if(!r.ok)return group;
   const answer=await r.json();
   if(!Array.isArray(answer)||answer.length!==group.length)return group;
   return group.filter((row,i)=>!translateResult(row,Array.isArray(answer[i])?answer[i][0]:answer[i],lang));
 }catch{return group}
}
async function translateIndividual(row,lang,timeout){
 const q=new URLSearchParams({client:'gtx',sl:'auto',tl:lang==='zh'?'zh-CN':lang,dt:'t',q:row.masked});
 try{
   const r=await fetch('https://translate.googleapis.com/translate_a/single?'+q,{
     signal:AbortSignal.timeout(timeout),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':86400,'400-599':0}}});
   if(r.ok){
     const d=await r.json();
     translateResult(row,d[0].map(s=>s[0]).join(''),lang);
   }
 }catch{}
}
async function prepareProductNames(names,lang) {
 if(!codes.includes(lang))return;
 const pending=[];
 const dict=glossary(lang);
 for(const value of new Set(names.map(normalize).filter(Boolean))){
   if(value.length>450||cache.has(lang+'|'+value))continue;
   const {masked,kept}=maskPublicTitle(value);
   const remaining=masked.replace(/ZXQ\d+QXZ/g,' ');
   if(lang==='en'&&!/\p{Script=Han}/u.test(remaining))continue;
   const check=lang==='zh'?remaining:fromChinese(remaining);
   const unresolved=check.replace(dict.regex,word=>dict.words.has(word.toLowerCase())?' ':word)
     .replace(/\b(?:x|a|an|of|the|in|s)\b/gi,' ');
   if(!/[\p{L}]{2}/u.test(unresolved))continue;
   pending.push({value,masked,kept});
 }
 if(!pending.length)return;
 // At most four concurrent requests in each phase and 3.3 seconds total.
 const single=pending.length===1;
 const groups=[];
 const requested=pending.slice(0,24);
 for(let i=0;i<requested.length;i+=6)groups.push(requested.slice(i,i+6));
 const failed=(await Promise.all(groups.map(group=>
   translateGroup(group,lang,'https://translate.googleapis.com',1700)))).flat();
 if(!failed.length)return;
 if(single || failed.length<=3){
   await Promise.all(failed.map(row=>translateIndividual(row,lang,1600)));
 }else{
   const retries=[];
   for(let i=0;i<failed.length;i+=6)retries.push(translateGroup(failed.slice(i,i+6),lang,'https://clients5.google.com',1600));
   await Promise.all(retries);
 }
}
return {localProductName, localProductOption, localSourceQuery, prepareProductNames};
})();
