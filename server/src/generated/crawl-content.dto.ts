import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CrawlContentDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  totalGoogleAds: number;
  @ApiProperty({
    required: false,
  })
  links: Prisma.JsonValue;
  @ApiProperty({
    required: false,
  })
  content: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  createdAt: Date;
}
