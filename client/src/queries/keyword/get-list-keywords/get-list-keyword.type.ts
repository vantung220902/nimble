export interface ListKeywordParam {
  fileUploadId: string;
}

export interface ListKeywordResponse {
  id: string;
  status: string;
  content: string;
  createdAt: string;
  resolvedAt: string;
}
