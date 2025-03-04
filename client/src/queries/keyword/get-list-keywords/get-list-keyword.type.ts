export interface ListKeywordParam {
  fileUploadId: string;
}

interface CrawledContentResponse {
  totalLinks: number;
  totalGoogleAds: number;
  content: string;
}

export interface ListKeywordResponse {
  id: string;
  status: string;
  content: string;
  createdAt: string;
  resolvedAt: string;
  crawledContent?: CrawledContentResponse;
}
