export type ProductFind = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  categoryUrl: string;
  listingId: string;
  price: string;
  currency: "CNY";
  checked: string;
  mainSiteUrl: string;
  images: string[];
  inspectionFocus: string;
};

const image = (path: string) => `/product-images/${path.split("/").pop()}`;

export const products: ProductFind[] = [
  {
    slug: "hoka-speedgoat-5-trail-running-shoes",
    name: "HOKA One One Speedgoat 5 Trail Running Shoes",
    shortName: "Speedgoat 5 Trail Running Shoes",
    category: "Shoes",
    categoryUrl: "https://www.cnbuycha.com/shoes/",
    listingId: "7806024805",
    price: "218",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3359.html",
    images: [
      image("/uploads/allimg/20260713/1-260G31AHDQ.webp"),
      image("/uploads/allimg/20260713/1-260G31AHL22.jpg"),
      image("/uploads/allimg/20260713/1-260G31AHX26.jpg"),
      image("/uploads/allimg/20260713/1-260G31AHc23.jpg"),
      image("/uploads/allimg/20260713/1-260G31AI0W4.jpg"),
    ],
    inspectionFocus: "upper shape, outsole pattern, heel construction, side panels and visible stitching",
  },
  {
    slug: "maison-margiela-hoodie",
    name: "Maison Margiela Hoodie",
    shortName: "Maison Margiela Hoodie",
    category: "Hoodies",
    categoryUrl: "https://www.cnbuycha.com/hoodies-sweaters/",
    listingId: "7806044269",
    price: "130",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3360.html",
    images: [
      image("/uploads/allimg/20260713/1-260G31AZ3Y4.webp"),
      image("/uploads/allimg/20260713/1-260G31AZ4B3.jpg"),
      image("/uploads/allimg/20260713/1-260G31AZ4592.jpg"),
      image("/uploads/allimg/20260713/1-260G31AZ5I2.jpg"),
      image("/uploads/allimg/20260713/1-260G31AZ61D.jpg"),
    ],
    inspectionFocus: "fabric texture, hood shape, print placement, cuffs, hem and seam alignment",
  },
  {
    slug: "louis-vuitton-tee",
    name: "Louis Vuitton Tee",
    shortName: "Louis Vuitton Tee",
    category: "T-Shirts",
    categoryUrl: "https://www.cnbuycha.com/t-shirts/",
    listingId: "7804306830",
    price: "150",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3347.html",
    images: [
      image("/uploads/allimg/20260706/1-260F6161541109.webp"),
      image("/uploads/allimg/20260706/1-260F6161542437.jpg"),
      image("/uploads/allimg/20260706/1-260F6161543a0.jpg"),
      image("/uploads/allimg/20260706/1-260F6161544V8.jpg"),
    ],
    inspectionFocus: "collar shape, graphic placement, fabric surface, sleeve length and hem stitching",
  },
  {
    slug: "celine-coat",
    name: "Celine Coat",
    shortName: "Celine Coat",
    category: "Jackets",
    categoryUrl: "https://www.cnbuycha.com/jackets/",
    listingId: "7809005168",
    price: "247",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3356.html",
    images: [
      image("/uploads/allimg/20260713/1-260G31A22I07.webp"),
      image("/uploads/allimg/20260713/1-260G31A229E8.jpg"),
      image("/uploads/allimg/20260713/1-260G31A2302A.jpg"),
      image("/uploads/allimg/20260713/1-260G31A231318.jpg"),
    ],
    inspectionFocus: "overall silhouette, closure hardware, lining, pockets, cuffs and seam finishing",
  },
  {
    slug: "hello-kitty-plush-pants",
    name: "Hello Kitty Plush Pants",
    shortName: "Hello Kitty Plush Pants",
    category: "Pants",
    categoryUrl: "https://www.cnbuycha.com/pants-shorts/",
    listingId: "7801003304",
    price: "49",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3336.html",
    images: [
      image("/uploads/allimg/20260701/1-260F1153153Z5.webp"),
      image("/uploads/allimg/20260701/1-260F1153154305.jpg"),
      image("/uploads/allimg/20260701/1-260F1153155594.jpg"),
      image("/uploads/allimg/20260701/1-260F115315A08.jpg"),
    ],
    inspectionFocus: "fabric pile, print clarity, waistband, leg proportions and inner-seam finish",
  },
  {
    slug: "era-hats",
    name: "Era Hats",
    shortName: "Era Hats",
    category: "Headwear",
    categoryUrl: "https://www.cnbuycha.com/headwear/",
    listingId: "7792565153",
    price: "69",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3332.html",
    images: [
      image("/uploads/allimg/20260623/1-260623211T1911.webp"),
      image("/uploads/allimg/20260623/1-260623211S2F8.jpg"),
      image("/uploads/allimg/20260623/1-260623211S2164.jpg"),
      image("/uploads/allimg/20260623/1-260623211S3D4.jpg"),
      image("/uploads/allimg/20260623/1-260623211S45U.jpg"),
    ],
    inspectionFocus: "crown shape, embroidery, brim curve, interior band and adjustment hardware",
  },
  {
    slug: "nike-elite-backpack",
    name: "Nike Elite Backpack",
    shortName: "Nike Elite Backpack",
    category: "Accessories",
    categoryUrl: "https://www.cnbuycha.com/accessories/",
    listingId: "7804348058",
    price: "89",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3346.html",
    images: [
      image("/uploads/allimg/20260706/1-260F6161259202.webp"),
      image("/uploads/allimg/20260706/1-260F6161259C7.jpg"),
      image("/uploads/allimg/20260706/1-260F6161300223.jpg"),
      image("/uploads/allimg/20260706/1-260F6161301a4.jpg"),
    ],
    inspectionFocus: "zipper tracks, strap stitching, pocket layout, panel alignment and interior space",
  },
  {
    slug: "samsung-galaxy-watch8",
    name: "Samsung Galaxy Watch8",
    shortName: "Samsung Galaxy Watch8",
    category: "Electronics",
    categoryUrl: "https://www.cnbuycha.com/electronics/",
    listingId: "7808981470",
    price: "218",
    currency: "CNY",
    checked: "July 22, 2026",
    mainSiteUrl: "https://www.cnbuycha.com/AllProducts/3357.html",
    images: [
      image("/uploads/allimg/20260713/1-260G31A40J10.webp"),
      image("/uploads/allimg/20260713/1-260G31A405Q4.jpg"),
      image("/uploads/allimg/20260713/1-260G31A406496.jpg"),
      image("/uploads/allimg/20260713/1-260G31A40MH.jpg"),
    ],
    inspectionFocus: "screen, casing, buttons, strap connection, charging accessories and packaging contents",
  },
];

export const featuredProduct = products[0];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
