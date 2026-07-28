const articleMedia = {
  "lolobuy-spreadsheet-guide": {
    src: "/articles/lolobuy-spreadsheet-guide.webp",
    width: 1200,
    height: 630,
  },
  "how-to-read-qc-photos": {
    src: "/articles/how-to-read-qc-photos.webp",
    width: 1200,
    height: 630,
  },
  "plan-china-shopping-haul": {
    src: "/articles/plan-china-shopping-haul.webp",
    width: 1200,
    height: 630,
  },
  "lolobuy-review-early-user-experience": {
    src: "/articles/lolobuy-review-early-user-experience.webp",
    width: 1200,
    height: 630,
  },
  "lolobuy-weidian-link-guide": {
    src: "/articles/lolobuy-weidian-link-guide.webp",
    width: 1200,
    height: 630,
  },
} as const;

export function getArticleMedia(slug: string) {
  return articleMedia[slug as keyof typeof articleMedia] ?? {
    src: "/social/lolobuy-sheet-share.webp",
    width: 1200,
    height: 630,
  };
}
