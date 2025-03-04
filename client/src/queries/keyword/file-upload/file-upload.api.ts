import { GetPresignedPayload, SearchKeywordUploadPayload, UploadFilePayload } from '@queries';
import { httpService } from '@services';
import { newCancelToken } from '@utils';
import axios from 'axios';

const getPresignedUploadUrl = (params: GetPresignedPayload) => {
  return httpService.get(`api-svc/v1/file/presigned-upload-url`, params, newCancelToken());
};

const uploadFileWithProgress = (body: UploadFilePayload) => {
  return axios.put(body.url, body.fileData, {
    onUploadProgress: (progress) => {
      const { loaded, total } = progress;
      const percentageProgress = Math.floor((loaded / total) * 100);
      body.setProgress(percentageProgress);
    },
  });
};

const uploadSearchKeyword = (params: SearchKeywordUploadPayload) => {
  return httpService.post(`api-svc/v1/search-keywords/upload`, params, newCancelToken());
};

export const FileUploadApi = {
  getPresignedUploadUrl,
  uploadFileWithProgress,
  uploadSearchKeyword,
};
