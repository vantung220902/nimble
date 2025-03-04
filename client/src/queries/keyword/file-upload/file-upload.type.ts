export enum FileUploadType {
  keywords = 'keywords',
}

export interface GetPresignedPayload {
  fileName?: string;
  contentType?: string;
  fileData?: File;
  type?: FileUploadType | null;
  callback?: Callback;
  fullPath?: string;
  keepOriginalQuality?: boolean;
  keyId?: string;
  url?: string;
}

export interface UploadFilePayload {
  url: string;
  fileData: File;
  setProgress?: Callback;
}

export interface SearchKeywordUploadPayload {
  url: string;
}

export interface SearchKeywordUploadResponse {
  connectionId: string;
  totalKeywords: number;
}
