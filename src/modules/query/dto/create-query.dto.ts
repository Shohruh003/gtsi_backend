import { ApiProperty } from '@nestjs/swagger';

export class CreateQueryDto {

  @ApiProperty({
    format: 'binary',
    required: false,
    description: 'Image1',
  })
  image1: string;

  @ApiProperty({
    format: 'binary',
    required: false,
    description: 'Image2',
  })
  image2: string;
}
