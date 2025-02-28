import { CommandHandlerBase } from '@common/cqrs';
import { PrismaService } from '@database';
import { FileService } from '@modules/file/services';
import { MAXIMUM_KEYWORDS_PROCESS } from '@modules/search-keyword-management/search-keyword-management.enum';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ProcessingStatus } from '@prisma/client';

import { UploadKeywordsCommand } from './upload-keywords.command';
import { UploadKeywordsCommandResponse } from './upload-keywords.response';

@CommandHandler(UploadKeywordsCommand)
export class UploadKeywordsHandler extends CommandHandlerBase<
  UploadKeywordsCommand,
  UploadKeywordsCommandResponse
> {
  constructor(
    private readonly dbContext: PrismaService,
    private readonly fileService: FileService,
  ) {
    super();
  }

  public execute(
    command: UploadKeywordsCommand,
  ): Promise<UploadKeywordsCommandResponse> {
    return this.uploadKeywords(command);
  }

  private async uploadKeywords({
    body: { url },
    reqUser,
  }: UploadKeywordsCommand): Promise<UploadKeywordsCommandResponse> {
    const keywords = await this.fileService.getContentFromUrl(url);

    if (keywords.length === 0) {
      throw new BadRequestException('Upload empty keywords file!');
    }

    if (keywords.length > MAXIMUM_KEYWORDS_PROCESS) {
      throw new BadRequestException(
        `Upload keywords file must less than ${MAXIMUM_KEYWORDS_PROCESS} keywords!`,
      );
    }

    const createdFileKeywords = await this.dbContext.fileKeywordsUpload.create({
      data: {
        fileUrl: url,
        userId: reqUser.sub,
        totalKeywords: keywords.length,
        status: ProcessingStatus.PENDING,
        uploadedAt: new Date(),
      },
    });

    return {
      connectionId: createdFileKeywords.id,
      totalKeyword: keywords.length,
    };
  }
}
