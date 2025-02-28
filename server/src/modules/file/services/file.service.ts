import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { normalizeFileName } from '@common/utils';
import { AppConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetPrivateWriteUrlRequestQuery } from '../application/queries/get-private-write-url/get-private-write-url.request-query';
import { GetPrivateReadUrlDto } from '../dtos';
import { PRE_SIGN_URL_EXPIRES_IN_SECONDS } from '../file.enum';

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({});

  constructor(private readonly appConfig: AppConfig) {}

  public async getPrivateReadUrl(
    option: GetPrivateReadUrlDto,
  ): Promise<string> {
    const { filePath } = option;

    const { hostname, pathname } = new URL(filePath);
    const bucket = hostname.split('.')[0];
    const key = pathname.slice(1);

    const url = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
      {
        expiresIn: PRE_SIGN_URL_EXPIRES_IN_SECONDS,
      },
    );

    return url;
  }

  public async getPrivateWriteUrl(
    userId: string,
    query: GetPrivateWriteUrlRequestQuery,
  ): Promise<string> {
    const { type, contentType, fileName, customKey } = query;

    const key =
      customKey ||
      `${type}/${userId}/${uuidv4()}_${normalizeFileName(fileName)}`;

    const url = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: this.appConfig.bucketS3Name,
        Key: key,
        ContentType: contentType,
      }),
      {
        expiresIn: PRE_SIGN_URL_EXPIRES_IN_SECONDS,
      },
    );

    return url;
  }
}
