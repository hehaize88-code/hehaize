import Link from "next/link";
import {
  ArticleCards,
  CategoryStrip,
  FAQList,
  Footer,
  GuideCards,
  Header,
  ProductGrid,
  SearchBox,
} from "./components";
import {
  MAIN_SITE,
  USD_CNY_REFERENCE_RATE,
  USD_RATE_DATE,
  products,
  workflow,
} from "./data";
import { type Locale, localizePath, t } from "./i18n";
import { getSiteData } from "./localized-data";

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  const localizedData = getSiteData(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedData.faq.slice(0, 4).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Header locale={locale} currentPath="/" />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              {t(locale, "home.eyebrow")}
            </div>
            <h1>
              {t(locale, "home.heroTop")}{" "}
              <mark>{t(locale, "home.heroAccent")}</mark>
              <br />
              {t(locale, "home.heroBottom")}
            </h1>
            <p>{t(locale, "home.heroText")}</p>
            <SearchBox locale={locale} />
            <div className="hero-actions">
              <a
                className="primary-button"
                href={`${MAIN_SITE}/AllProducts/`}
                target="_blank"
                rel="noreferrer"
              >
                {t(locale, "home.browse")} <span>↗</span>
              </a>
              <Link
                className="text-link"
                href={localizePath(locale, "/guides/how-to-use-pikobuy")}
              >
                {t(locale, "home.how")} <span>→</span>
              </Link>
            </div>
            <div className="trust-row">
              <span><i className="calendar-icon" /> {t(locale, "home.trust1")}</span>
              <span><i className="shield-icon">✓</i> {t(locale, "home.trust2")}</span>
              <span><i className="link-icon">↗</i> {t(locale, "home.trust3")}</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Product research card preview">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="spark spark-one">✦</div>
            <div className="spark spark-two">✦</div>
            <a
              className="floating-card shoe-card"
              href={products[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${products[0].name} on CNBuy`}
              title={`View ${products[0].name}`}
            >
              <span className="check-dot">✓</span>
              <img
                src="https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AHDQ.webp"
                alt="Trail running shoe product find"
              />
              <div className="fake-lines"><i /><i /><i /></div>
              <b>{t(locale, "home.qcShoe")}</b>
            </a>
            <a
              className="floating-card hoodie-card"
              href={products[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${products[1].name} on CNBuy`}
              title={`View ${products[1].name}`}
            >
              <span className="check-dot">✓</span>
              <img
                src="https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2211102W7.webp"
                alt="Hoodie product find"
              />
              <div className="fake-lines"><i /><i /></div>
              <b>{t(locale, "home.qcHoodie")}</b>
            </a>
            <a
              className="floating-card hat-card"
              href={products[3].href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${products[3].name} on CNBuy`}
              title={`View ${products[3].name}`}
            >
              <span className="check-dot">✓</span>
              <img
                src="https://www.cnbuycha.com/uploads/allimg/20260722/1-260H221155C13.webp"
                alt="Hat product find"
              />
              <b>{t(locale, "home.qcHat")}</b>
            </a>
            <div className="research-card">
              <div><span>01</span><b>{t(locale, "home.listing")}</b><i /></div>
              <div><span>02</span><b>{t(locale, "home.photos")}</b><i /></div>
              <div><span>03</span><b>{t(locale, "home.route")}</b><i /></div>
            </div>
          </div>
          <CategoryStrip locale={locale} />
        </section>

        <section className="section section-products" id="finds">
          <div className="section-heading">
            <div>
              <span className="kicker">{t(locale, "home.latest")}</span>
              <h2>{t(locale, "home.shortlist")}</h2>
            </div>
            <Link href={localizePath(locale, "/finds")}>
              {t(locale, "home.allFinds")}
            </Link>
          </div>
          <ProductGrid limit={4} locale={locale} />
          <p className="catalogue-note">
            {t(locale, "home.priceNoteBefore")} US$1 = ¥
            {USD_CNY_REFERENCE_RATE.toFixed(2)} ({USD_RATE_DATE}).{" "}
            {t(locale, "home.priceNoteAfter")}
          </p>
        </section>

        <section className="section research-section">
          <div className="research-copy">
            <span className="kicker">{t(locale, "home.qcKicker")}</span>
            <h2>{t(locale, "home.qcTitle")}</h2>
            <p>{t(locale, "home.qcText")}</p>
            <Link
              className="primary-button dark"
              href={localizePath(locale, "/guides/pikobuy-qc-checklist")}
            >
              {t(locale, "home.qcButton")} <span>→</span>
            </Link>
          </div>
          <div className="research-dashboard">
            <div className="dashboard-title">
              <strong>{t(locale, "home.reviewOverview")}</strong>
              <span><i /> {t(locale, "home.practicalChecks")}</span>
            </div>
            <div className="metric-grid">
              <div><small>{t(locale, "home.listing")}</small><b>{t(locale, "home.options")}</b><span>{t(locale, "home.optionsDetail")}</span></div>
              <div><small>{t(locale, "home.warehouse")}</small><b>{t(locale, "home.photos")}</b><span>{t(locale, "home.photosDetail")}</span></div>
              <div><small>{t(locale, "home.product")}</small><b>{t(locale, "home.measurements")}</b><span>{t(locale, "home.measurementsDetail")}</span></div>
              <div><small>{t(locale, "home.parcel")}</small><b>{t(locale, "home.shipping")}</b><span>{t(locale, "home.shippingDetail")}</span></div>
            </div>
            <div className="check-bars">
              <div><span>{t(locale, "home.visibleCondition")}</span><i><b style={{ width: "92%" }} /></i></div>
              <div><span>{t(locale, "home.sizeEvidence")}</span><i><b style={{ width: "76%" }} /></i></div>
              <div><span>{t(locale, "home.listingClarity")}</span><i><b style={{ width: "64%" }} /></i></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <span className="kicker">{t(locale, "home.processKicker")}</span>
              <h2>{t(locale, "home.processTitle")}</h2>
            </div>
            <Link href={localizePath(locale, "/guides/how-to-use-pikobuy")}>
              {t(locale, "home.fullGuide")}
            </Link>
          </div>
          <div className="workflow-grid">
            {workflow.map((step, index) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{localizedData.workflow[index].title}</h3>
                <p>{localizedData.workflow[index].text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section soft-section">
          <div className="section-heading">
            <div>
              <span className="kicker">{t(locale, "home.guidesKicker")}</span>
              <h2>{t(locale, "home.guidesTitle")}</h2>
            </div>
            <Link href={localizePath(locale, "/guides")}>
              {t(locale, "home.allGuides")}
            </Link>
          </div>
          <GuideCards locale={locale} />
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <span className="kicker">{t(locale, "home.articlesKicker")}</span>
              <h2>{t(locale, "home.articlesTitle")}</h2>
            </div>
            <Link href={localizePath(locale, "/seo-articles")}>
              {t(locale, "home.allArticles")}
            </Link>
          </div>
          <ArticleCards locale={locale} />
        </section>

        <section className="section faq-section">
          <div className="faq-intro">
            <span className="kicker">{t(locale, "home.faqKicker")}</span>
            <h2>{t(locale, "home.faqTitle")}</h2>
            <p>{t(locale, "home.faqText")}</p>
            <Link href={localizePath(locale, "/faq")}>
              {t(locale, "home.everyAnswer")}
            </Link>
          </div>
          <FAQList limit={4} locale={locale} />
        </section>

        <section className="final-cta">
          <span>{t(locale, "home.ready")}</span>
          <h2>{t(locale, "home.finalTitle")}</h2>
          <SearchBox compact locale={locale} />
        </section>
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function Home() {
  return <HomePage locale="en" />;
}
