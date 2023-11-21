import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchFaceDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string
}