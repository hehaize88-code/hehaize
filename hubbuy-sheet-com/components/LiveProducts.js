"use client";

import { useEffect, useState } from "react";

export default function LiveProducts({ initialProducts, locale }) {
  const [products, setProducts] = useState(initialProducts);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/catalog', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Catalog unavailable'); return response.json(); })
      .then(data => { if (data.products?.length) setProducts(data.products.slice(0, 4)); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  const prefix = locale === 'en' ? '' : '/' + locale;
  return <div id="hubbuy-live-products" className="catalog-grid" data-locale={locale}>
    {products.map(product => <article key={product.path} className="catalog-card">
      <a href={`${prefix}/catalog${product.path}`}>
        <img src={product.image} alt={product.title} width="400" height="400" loading="lazy" />
        <h3>{product.title}</h3>
        <div className="card-meta"><strong>${Number(product.price).toFixed(2)}</strong><span>USD · ↗</span></div>
      </a>
    </article>)}
  </div>;
}
