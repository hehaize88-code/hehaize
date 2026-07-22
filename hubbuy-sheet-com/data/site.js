import { categoryPages } from "./categories.js";

export const MAIN_SITE = "https://www.cnbuycha.com";
export const SITE_URL = "https://hubbuy-sheet.com";

export const categories = categoryPages.map((category) => ({
  ...category,
  href: `/categories/${category.slug}/`,
  liveHref: `${MAIN_SITE}${category.livePath}`,
}));

const checked = "2026-07-22";
const localImages = new Map([
  [3346, "/products/3346.webp"], [3347, "/products/3347.webp"],
  [3348, "/products/3348.jpg"], [3349, "/products/3349.webp"],
  [3350, "/products/3350.webp"], [3351, "/products/3351.webp"],
  [3352, "/products/3352.webp"], [3353, "/products/3353.webp"],
  [3354, "/products/3354.webp"], [3355, "/products/3355.webp"],
  [3356, "/products/3356.webp"], [3357, "/products/3357.webp"],
  [3358, "/products/3358.webp"], [3359, "/products/3359.webp"],
  [3360, "/products/3360.webp"], [3361, "/products/3361.webp"],
]);

function referenceProduct(id, name, price, category, sourceId, remoteImage) {
  return {
    id,
    name,
    price,
    category,
    sourceId,
    checked,
    image: localImages.get(id) || remoteImage,
    href: `${MAIN_SITE}/AllProducts/${id}.html`,
    localHref: `/products/${id}/`,
  };
}

export const products = [
  referenceProduct(3359, "HOKA One One Speedgoat 5 Trail Running Shoes", "218", "Shoes", "7806024805", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AHDQ.webp"),
  referenceProduct(3358, "Louis Vuitton Slides", "100", "Shoes", "7809007136", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A54VB.webp"),
  referenceProduct(3355, "Golden Goose Low", "460", "Shoes", "7809040508", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A04HY.webp"),
  referenceProduct(3348, "Adidas Futurecraft 4D Running Shoes - Innovative Tech Sneakers", "210", "Shoes", "7801363863", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161H3111.jpg"),
  referenceProduct(3329, "Timberland x Supreme", "458", "Shoes", "7795635784", "https://www.cnbuycha.com/uploads/allimg/20260623/1-260623211214312.jpg"),
  referenceProduct(3327, "New Balance 1906/740 shoes", "180", "Shoes", "7795557350", "https://www.cnbuycha.com/uploads/allimg/20260623/1-260623210250C6.webp"),
  referenceProduct(3326, "nocta X nike hot step air terra", "189", "Shoes", "7795578880", "https://www.cnbuycha.com/uploads/allimg/20260623/1-26062321021UU.webp"),
  referenceProduct(3321, "Nike Zoom GT Cut 2", "210", "Shoes", "7785841347", "https://www.cnbuycha.com/uploads/allimg/20260615/1-260615205A5493.webp"),

  referenceProduct(3360, "Maison Margiela Hoodie", "130", "Hoodies", "7806044269", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AZ3Y4.webp"),
  referenceProduct(3330, "Dior Sweater", "198", "Hoodies", "7792586781", "https://www.cnbuycha.com/uploads/allimg/20260623/1-26062321140Q58.jpg"),
  referenceProduct(3309, "Denim Tears Cotton Bloom Sweatshirt [8 styles]", "144.5", "Hoodies", "7786991498", "https://www.cnbuycha.com/uploads/allimg/20260611/1-260611205641428.webp"),
  referenceProduct(3308, "Stussy Spray Can Hoodie [33 styles]", "110.5", "Hoodies", "7786965206", "https://www.cnbuycha.com/uploads/allimg/20260611/1-260611205502F7.webp"),
  referenceProduct(3299, "Maison Margiela Replica Sweatshirt [29 styles]", "110.5", "Hoodies", "7780406055", "https://www.cnbuycha.com/uploads/allimg/20260605/1-2606051523121P.webp"),
  referenceProduct(3298, "Maison Margiela Graphic Print Sweatshirt [28 styles]", "138", "Hoodies", "7780390329", "https://www.cnbuycha.com/uploads/allimg/20260605/1-2606051521043U.webp"),
  referenceProduct(3297, "Maison Margiela Tabi Heart Number Print Sweatshirt [40 styles]", "110.5", "Hoodies", "7783313254", "https://www.cnbuycha.com/uploads/allimg/20260605/1-260605151S9563.webp"),
  referenceProduct(2812, "Akimbo Layton Jacket (Zip up Hoodie", "238.8", "Hoodies", "7694255489", "https://www.cnbuycha.com/uploads/allimg/20260220/1-260220002FB15.jpg"),

  referenceProduct(3352, "Off-White Tee", "112", "T-Shirts", "7804363912", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6162324124.webp"),
  referenceProduct(3347, "Louis Vuitton Tee", "150", "T-Shirts", "7804306830", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161541109.webp"),
  referenceProduct(3317, "NBA NIKE Lakers training T-shirt tee (40+)", "129", "T-Shirts", "7788837248", "https://www.cnbuycha.com/uploads/allimg/20260615/1-2606151A22RC.webp"),
  referenceProduct(3316, "CK Calvin Klein T-shirt TEE (9+ styles)", "109", "T-Shirts", "7788845150", "https://www.cnbuycha.com/uploads/allimg/20260615/1-2606151A01XU.webp"),
  referenceProduct(3294, "Dior 1947 T-Shirt [39 styles]", "183.13", "T-Shirts", "7783386366", "https://www.cnbuycha.com/uploads/allimg/20260605/1-260605151213c3.webp"),
  referenceProduct(3205, "NEW ERA shirt (28 styles)", "170", "T-Shirts", "7751651854", "https://www.cnbuycha.com/uploads/allimg/20260428/1-26042Q51I3K3.jpg"),
  referenceProduct(3188, "EVISU Fashion T-shirts Shirts (40 CP)", "126", "T-Shirts", "7747610931", "https://www.cnbuycha.com/uploads/allimg/20260427/1-26042G4494U21.jpg"),
  referenceProduct(3187, "Black 8 letter T-shirt (2 styles)", "99", "T-Shirts", "7750626582", "https://www.cnbuycha.com/uploads/allimg/20260427/1-26042G44Q55F.jpg"),

  referenceProduct(3356, "Celine Coat", "247", "Jackets", "7809005168", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A22I07.webp"),
  referenceProduct(3354, "Louis Vuitton Jacket", "388", "Jackets", "7809064054", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G3164SUC.webp"),
  referenceProduct(3349, "Saint Vanity Windbreaker", "240", "Jackets", "7801283101", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161Z0626.webp"),
  referenceProduct(3343, "Balenciaga Puffer", "595", "Jackets", "7804322444", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6160550120.webp"),
  referenceProduct(3341, "Winter hooded down jacket", "272", "Jackets", "7798076213", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F115520U91.webp"),
  referenceProduct(3333, "Supreme Jacket", "280", "Jackets", "7797995405", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F115200a55.webp"),
  referenceProduct(3312, "BZ20-M Color-Block Puffer Jacket [18 styles]", "350", "Jackets", "7784070515", "https://www.cnbuycha.com/uploads/allimg/20260611/1-260611210143354.webp"),
  referenceProduct(3311, "Stussy Diamond Logo Jacket [3 styles]", "255", "Jackets", "7784109817", "https://www.cnbuycha.com/uploads/allimg/20260611/1-260611210001Z5.webp"),

  referenceProduct(3353, "Polo Ralph Lauren Long Sleeve", "168", "Tops", "7806010973", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31645454b.webp"),
  referenceProduct(3350, "Acne Studios Longsleeve", "110", "Tops", "7801302883", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F61620411N.webp"),
  referenceProduct(3340, "Ralph Lauren Longsleeve", "230", "Tops", "7801109724", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1154920N8.webp"),
  referenceProduct(3338, "Maison Margiela Longsleeve", "111", "Tops", "7798086111", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1153Sa28.webp"),
  referenceProduct(3334, "Men's Premium Knit Cardigan with Horn Buttons - Etonic", "159", "Tops", "7798007323", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1152243336.webp"),
  referenceProduct(3318, "Boss Polo Shirt / Boss Shorts / Zipper Sweatshirt / Hoodie", "130", "Tops", "7785874853", "https://www.cnbuycha.com/uploads/allimg/20260615/1-2606151A610421.webp"),
  referenceProduct(3191, "Burberry Shirt (10+ styles)", "139", "Tops", "7747626725", "https://www.cnbuycha.com/uploads/allimg/20260427/1-26042G45512344.jpg"),
  referenceProduct(3189, "Versace Shirts Polo T-Shirts (15 styles)", "119", "Tops", "7747640635", "https://www.cnbuycha.com/uploads/allimg/20260427/1-26042G45156195.jpg"),

  referenceProduct(3346, "Nike Elite Backpack", "89", "Accessories", "7804348058", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161259202.webp"),
  referenceProduct(3351, "Syna World Mask", "69", "Accessories", "7801310707", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6162300Y3.webp"),
  referenceProduct(3345, "Adidas Bag", "136", "Accessories", "7801271409", "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F616111U59.webp"),
  referenceProduct(3342, "Nike Bag", "69", "Accessories", "7798017133", "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1155429209.webp"),
  referenceProduct(3324, "Keychain", "89", "Accessories", "7792486783", "https://www.cnbuycha.com/uploads/allimg/20260623/1-26062320564L46.webp"),
  referenceProduct(3322, "carhartt wallet", "85", "Accessories", "7788829484", "https://www.cnbuycha.com/uploads/allimg/20260615/1-260615205SQ31.webp"),
  referenceProduct(3279, "Omega x swatch moonswatch", "207", "Accessories", "7777542287", "https://www.cnbuycha.com/uploads/allimg/20260601/1-260601163405544.webp"),
  referenceProduct(3272, "Louis Vuitton Bag", "340", "Accessories", "7777516671", "https://www.cnbuycha.com/uploads/allimg/20260601/1-26060116143KB.webp"),

  referenceProduct(3357, "Samsung Galaxy Watch8", "218", "Electronics", "7808981470", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A40J10.webp"),
  referenceProduct(3235, "LV smart watch", "1120", "Electronics", "7757780680", "https://www.cnbuycha.com/uploads/allimg/20260505/1-260505163Z2360.jpg"),
  referenceProduct(3184, "Electronic Watch S8 (2 CP)", "488", "Electronics", "7745503467", "https://www.cnbuycha.com/uploads/allimg/20260425/1-26042515030X51.jpg"),
  referenceProduct(3182, "Apple Watch ULTRA2 watch", "520", "Electronics", "7745558937", "https://www.cnbuycha.com/uploads/allimg/20260425/1-26042514593Qa.jpg"),
  referenceProduct(2891, "apple16 PRO MAX (8 styles)", "1250", "Electronics", "7712836794", "https://www.cnbuycha.com/uploads/allimg/20260317/1-26031H10439643.jpg"),
  referenceProduct(2863, "MARSHALL SPEAKER", "228", "Electronics", "7706136693", "https://www.cnbuycha.com/uploads/allimg/20260312/1-26031215151J26.jpg"),
  referenceProduct(2849, "Razer Seiren Mini Ultra-Compact Condenser Microphone (4 styles)", "238", "Electronics", "7703378898", "https://www.cnbuycha.com/uploads/allimg/20260304/1-2603041A40O34.jpg"),
  referenceProduct(2841, "bluetooth headset", "60", "Electronics", "7703371028", "https://www.cnbuycha.com/uploads/allimg/20260304/1-26030416463N10.webp"),

  referenceProduct(3361, "Jellycat", "39", "Collectibles", "7805846905", "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31F043940.webp"),
  referenceProduct(3315, "Labubu Coke Pendant", "73", "Collectibles", "7788949714", "https://www.cnbuycha.com/uploads/allimg/20260615/1-2606151642429A.webp"),
  referenceProduct(2902, "collectible figures", "30", "Collectibles", "7711456695", "https://www.cnbuycha.com/uploads/allimg/20260319/1-260319143A2110.jpg"),
  referenceProduct(2692, "Dragon Ball Z Action Figures [32 styles]", "19", "Collectibles", "7652804946", "https://www.cnbuycha.com/uploads/allimg/20260104/1-260104142432450.jpg"),
  referenceProduct(2567, "Stitch series blind box trendy figure and plush toy", "40", "Collectibles", "7623791731", "https://www.cnbuycha.com/uploads/allimg/20251203/1-251203153312104.jpg"),
  referenceProduct(1745, "LIKE TOY", "256", "Collectibles", "7565881032", "https://www.cnbuycha.com/uploads/allimg/20251001/1-2510011U452964.jpg"),
  referenceProduct(1050, "KAWS toy", "25", "Collectibles", "7555866761", "https://www.cnbuycha.com/uploads/allimg/20250923/1-250923143121201.webp"),
  referenceProduct(1571, "ONE PIECE Figures", "29", "Collectibles", "7561875009", "https://www.cnbuycha.com/uploads/allimg/20250928/1-25092R10355636.jpg"),
];

export const productById = new Map(products.map((product) => [String(product.id), product]));

export function getProduct(id) {
  return productById.get(String(id));
}

export function getProductImageUrl(product) {
  return product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`;
}

export const faqGroups = [
  {
    label: "Official workflow",
    title: "Ordering and warehouse arrival",
    items: [
      {
        q: "How does the official Hubbuy buying process work?",
        a: "Hubbuy's public homepage presents three stages. First, search for a product, place the order, and pay the product price plus China shipping. The seller then sends the goods to a warehouse. After warehouse inspection, you prepare the parcel, pay international shipping, and wait for delivery."
      },
      {
        q: "Can I search Hubbuy with a product name or product link?",
        a: "Yes. The public Hubbuy homepage invites users to enter a product name or link. A search result is still a starting point: open the source listing and confirm the seller, variant, price, stock, and current images before paying."
      },
      {
        q: "What do I pay when I first place a Hubbuy order?",
        a: "The official homepage says the order stage includes the product price and China shipping fee. International shipping is shown later in the workflow, after the goods have reached the warehouse and you are ready to submit a parcel."
      },
      {
        q: "Does the original seller ship the product directly to me?",
        a: "Not in the workflow shown on Hubbuy's homepage. Hubbuy says the seller sends the goods to a warehouse first. Quality inspection and parcel preparation happen before the international delivery stage."
      },
      {
        q: "What does Hubbuy say happens when goods reach the warehouse?",
        a: "The current public homepage lists warehouse quality inspection, free quality-inspection images, and 300 days of free storage. Use the live order page to check the status and services attached to a particular item."
      }
    ]
  },
  {
    label: "Before shipping",
    title: "QC images and storage",
    items: [
      {
        q: "Does Hubbuy provide free QC or quality-inspection images?",
        a: "Yes. Hubbuy's public homepage currently states that customers receive free quality-inspection images after goods enter the warehouse. Review those images against the saved order variant and the original source listing."
      },
      {
        q: "How many free QC photos does Hubbuy provide?",
        a: "The public homepage confirms free quality-inspection images but does not publish one universal photo count. Check the images attached to the individual warehouse order and the current logged-in service rules instead of relying on an old number from a third-party guide."
      },
      {
        q: "Do Hubbuy QC images guarantee quality or authenticity?",
        a: "The public homepage describes quality inspection and free inspection images; it does not present those images as an authenticity certificate or a guarantee of long-term quality. Use them to check visible details such as color, quantity, labels, measurements, damage, and the ordered variant."
      },
      {
        q: "How long does Hubbuy advertise free warehouse storage?",
        a: "Hubbuy's current public homepage advertises 300 days of free storage. That is useful planning room, not a reason to delay inspection. Review arrivals promptly and check the live account for the order's storage status and any current conditions."
      }
    ]
  },
  {
    label: "Parcel decisions",
    title: "Consolidation and international shipping",
    items: [
      {
        q: "Can Hubbuy combine different orders into one parcel?",
        a: "Yes. The official homepage says different orders can be combined for shipping and describes combining products from multiple sellers into one parcel. Whether particular items should travel together still depends on their size, fragility, restrictions, and the routes offered on the parcel page."
      },
      {
        q: "When do I pay Hubbuy international shipping?",
        a: "Hubbuy's public workflow places the international shipping payment after warehouse inspection, when the customer prepares the package for delivery. This is separate from the product price and China shipping paid at the order stage."
      },
      {
        q: "Is international shipping included in the displayed product price?",
        a: "No. The official workflow separates the product price and China shipping fee from the international shipping fee. Plan for both payment stages rather than treating the source-listing price as the delivered total."
      },
      {
        q: "Where can I estimate Hubbuy shipping cost?",
        a: "The current public navigation includes a Shipping Cost Estimate entry. Use it for planning, then compare the figures and eligible routes shown for the completed parcel before paying because the parcel page is the current transaction record."
      },
      {
        q: "Does Hubbuy publish one fixed shipping fee or delivery time for every parcel?",
        a: "The public homepage does not state one universal international fee or delivery time. It tells customers to pay the international shipping fee and wait for delivery. Check the live estimate and parcel interface for the current destination, route, charge, and delivery information."
      },
      {
        q: "Does the official site offer Forwarding and Fill & Buy entry points?",
        a: "Yes. Forwarding and Fill & Buy are visible in Hubbuy's current public navigation. The homepage does not explain a permanent fee or universal procedure for either service, so use the instructions and prices shown in the live service flow."
      }
    ]
  },
  {
    label: "Policies and sources",
    title: "Returns, support and this guide",
    items: [
      {
        q: "Where should I confirm returns, customs, inspection, or compensation rules?",
        a: "Hubbuy's public footer lists dedicated help topics for returns and refunds, logistics shipping fees, customs and taxation, receipt information, shipping policy, product storage, inspection rules, and insurance and compensation. Check those live policies before making a time-sensitive or high-value decision."
      },
      {
        q: "How can I contact Hubbuy customer service?",
        a: "At the time of this review, Hubbuy's public homepage displays service@hubbuy.com, WhatsApp +86-13302465420, and service hours of 09:00–18:30 Beijing time. Confirm the current contact details on the official site before sending order information."
      },
      {
        q: "What payment brands appear on Hubbuy's public homepage?",
        a: "The homepage currently displays PayPal, Visa, Mastercard, Discover, and Diners Club logos. A displayed logo is not a promise that every method is available for every account, country, currency, or transaction; confirm the options shown at the live payment step."
      },
      {
        q: "What is a Hubbuy spreadsheet?",
        a: "A Hubbuy spreadsheet is an independent discovery list that organizes product links into searchable categories. It can help you build a shortlist, but the source listing and the live Hubbuy order interface remain the places to confirm the current seller, variant, price, warehouse status, and parcel details."
      },
      {
        q: "Is Hubbuy Sheet an official Hubbuy website or checkout service?",
        a: "No. Hubbuy Sheet is an independent editorial and product-discovery guide. It does not take payment, purchase goods, inspect items, operate the Hubbuy warehouse, or arrange delivery. Product links open the related live catalog or source page."
      },
      {
        q: "Are spreadsheet prices and product links always current?",
        a: "No catalog can guarantee that. Prices on this site are reference prices in Chinese yuan recorded during review. Sellers can change prices, variants, stock, or URLs, so re-check the live product page before submitting an order."
      }
    ]
  }
];

export const faqs = faqGroups.flatMap(group => group.items);
