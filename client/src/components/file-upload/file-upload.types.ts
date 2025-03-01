export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  SPREADSHEET = 'spreadsheet',
  DOCUMENT = 'document',
  PRESENTATION = 'presentation',
  PDF = 'pdf',
  CSV = 'csv',
  TXT = 'txt',
  OTHERS = 'other',
}

export interface Attachment {
  attachmentId?: number;
  uuid?: string;
  fileName: string;
  fileType: string;
  filePath: string;
}
