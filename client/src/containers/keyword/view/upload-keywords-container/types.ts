export interface KeywordType {
  status: string;
  keywordId?: string;
  content?: string;
}

export const ProcessingStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

export const STATUS_CLASS_MAP = {
  [ProcessingStatus.COMPLETED]: 'statusCompleted',
  [ProcessingStatus.PROCESSING]: 'statusProcessing',
  [ProcessingStatus.FAILED]: 'statusFail',
};

export const EXAMPLE_FILE = {
  name: 'keywords.csv',
  url: 'https://res.cloudinary.com/the-roap-trip/raw/upload/v1740994183/keywords_jq5tkz.csv',
};
