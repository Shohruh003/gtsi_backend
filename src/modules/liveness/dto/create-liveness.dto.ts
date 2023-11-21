import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateLivenessDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Videofayl',
    required: true,
    name: 'video',
  })
  video: Express.Multer.File;
}