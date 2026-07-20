const fallbackCover = {
  label: "FIELD GUIDE · 01",
  tone: "workflow",
  steps: [["Find", "Source link"], ["Check", "Warehouse QC"], ["Ship", "Parcel plan"]],
};

export default function ArticleCover({ compact = false, cover = fallbackCover }) {
  return (
    <div className={`article-cover article-cover-${cover.tone}${compact ? " article-cover-compact" : ""}`} aria-hidden="true" data-no-translate>
      <span className="article-cover-label">{cover.label}</span>
      <div className="article-cover-flow">
        {cover.steps.map(([title, note], index) => (
          <div className="article-cover-step" key={title}>
            <small>0{index + 1}</small><strong>{title}</strong><span>{note}</span>
          </div>
        )).reduce((items, step, index) => index ? [...items, <b key={`arrow-${index}`}>→</b>, step] : [step], [])}
      </div>
      <span className="article-cover-year">2026</span>
    </div>
  );
}
