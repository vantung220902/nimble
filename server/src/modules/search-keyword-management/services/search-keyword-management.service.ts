import { PrismaService } from '@database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchKeywordManagementService {
  constructor(private readonly dbContext: PrismaService) {}

  public getProcessingKeywordChannel(connectionId: string) {
    return `keywordsConnectionId:${connectionId}`;
  }
}
