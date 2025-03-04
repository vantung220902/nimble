import { TableParams, httpService } from '@services';
import { newCancelToken } from '@utils';

const getUploadedFiles = (params: TableParams) => {
  return httpService.get(`api-svc/v1/search-keywords/uploaded-files`, params, newCancelToken());
};

export const UploadedFilesApi = {
  getUploadedFiles,
};
