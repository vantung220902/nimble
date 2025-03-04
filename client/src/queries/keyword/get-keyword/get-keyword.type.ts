export interface GetKeywordParam {
  id: string;
}

export interface CrawledContent {
  totalLinks: number;
  totalGoogleAds: number;
  content: string;
}

export interface KeywordDetail {
  status: string;
  id: string;
  content: string;
  crawledContent?: CrawledContent;
  createdAt: string;
  resolvedAt: string;
}
