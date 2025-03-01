export enum FileType {
  CSV = 'csv',
}

export interface UploadFileType {
  id: string;
  file?: File & { path?: string };
  url?: string;
  name?: string;
  type: FileType;
}
