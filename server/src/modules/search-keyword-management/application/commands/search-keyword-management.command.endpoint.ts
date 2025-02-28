import { CommandEndpoint } from '@common/cqrs';
import { ApiResponse } from '@common/decorators';
import { AuthenticationGuard } from '@common/guards';
import { ResponseInterceptor } from '@common/interceptors';
import { UploadKeywordsCommand } from '@modules/search-keyword-management/application/commands/upload-keywords/upload-keywords.command';
import { UploadKeywordsRequestBody } from '@modules/search-keyword-management/application/commands/upload-keywords/upload-keywords.request-body';
import { UploadKeywordsCommandResponse } from '@modules/search-keyword-management/application/commands/upload-keywords/upload-keywords.response';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Search Keywords Management')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'search-keywords',
})
@UseGuards(AuthenticationGuard)
@UseInterceptors(ResponseInterceptor)
export class SearchKeywordManagementCommandEndpoint extends CommandEndpoint {
  constructor(protected commandBus: CommandBus) {
    super(commandBus);
  }

  @ApiOperation({ description: 'Upload file keywords endpoint' })
  @ApiResponse()
  @Post('upload')
  public upload(
    @Request() request,
    @Body() body: UploadKeywordsRequestBody,
  ): Promise<UploadKeywordsCommandResponse> {
    return this.commandBus.execute<
      UploadKeywordsCommand,
      UploadKeywordsCommandResponse
    >(new UploadKeywordsCommand(body, request.user));
  }
}
