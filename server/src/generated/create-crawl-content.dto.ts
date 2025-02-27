import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCrawlContentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
