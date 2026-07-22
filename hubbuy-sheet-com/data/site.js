import { categoryPages } from "./categories.js";

export const MAIN_SITE = "https://www.cnbuycha.com";
export const SITE_URL = "https://hubbuy-sheet.com";

export const categories = categoryPages.map((category) => ({
  ...category,
  href: `/categories/${category.slug}/`,
  liveHref: `${MAIN_SITE}${category.livePath}`,
}));

export const products = [
  { id: 3346, name: "Nike Elite Backpack", price: "89", image: "/products/3346.webp", category: "Accessories", href: `${MAIN_SITE}/AllProducts/3346.html` },
  { id: 3361, name: "Jellycat", price: "39", image: "/products/3361.webp", category: "Collectibles", href: `${MAIN_SITE}/AllProducts/3361.html` },
  { id: 3360, name: "Maison Margiela Hoodie", price: "130", image: "/products/3360.webp", category: "Hoodies", href: `${MAIN_SITE}/AllProducts/3360.html` },
  { id: 3359, name: "HOKA Speedgoat 5 Trail Shoes", price: "218", image: "/products/3359.webp", category: "Shoes", href: `${MAIN_SITE}/AllProducts/3359.html` },
  { id: 3358, name: "Louis Vuitton Slides", price: "100", image: "/products/3358.webp", category: "Shoes", href: `${MAIN_SITE}/AllProducts/3358.html` },
  { id: 3357, name: "Samsung Galaxy Watch8", price: "218", image: "/products/3357.webp", category: "Electronics", href: `${MAIN_SITE}/AllProducts/3357.html` },
  { id: 3356, name: "Celine Coat", price: "247", image: "/products/3356.webp", category: "Jackets", href: `${MAIN_SITE}/AllProducts/3356.html` },
  { id: 3355, name: "Golden Goose Low", price: "460", image: "/products/3355.webp", category: "Shoes", href: `${MAIN_SITE}/AllProducts/3355.html` },
  { id: 3354, name: "Louis Vuitton Jacket", price: "388", image: "/products/3354.webp", category: "Jackets", href: `${MAIN_SITE}/AllProducts/3354.html` },
  { id: 3353, name: "Polo Ralph Lauren Long Sleeve", price: "168", image: "/products/3353.webp", category: "Tops", href: `${MAIN_SITE}/AllProducts/3353.html` },
  { id: 3352, name: "Off-White Tee", price: "112", image: "/products/3352.webp", category: "T-Shirts", href: `${MAIN_SITE}/AllProducts/3352.html` },
  { id: 3351, name: "Syna World Mask", price: "69", image: "/products/3351.webp", category: "Accessories", href: `${MAIN_SITE}/AllProducts/3351.html` },
  { id: 3350, name: "Acne Studios Longsleeve", price: "110", image: "/products/3350.webp", category: "Tops", href: `${MAIN_SITE}/AllProducts/3350.html` },
  { id: 3349, name: "Saint Vanity Windbreaker", price: "240", image: "/products/3349.webp", category: "Jackets", href: `${MAIN_SITE}/AllProducts/3349.html` },
  { id: 3348, name: "Adidas Futurecraft 4D Shoes", price: "210", image: "/products/3348.jpg", category: "Shoes", href: `${MAIN_SITE}/AllProducts/3348.html` },
  { id: 3347, name: "Louis Vuitton Tee", price: "150", image: "/products/3347.webp", category: "T-Shirts", href: `${MAIN_SITE}/AllProducts/3347.html` },
];

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
