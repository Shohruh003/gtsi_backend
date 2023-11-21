import { Controller, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LivenessService } from './liveness.service';

@Controller('liveness')
@ApiTags('liveness')
export class LivenessController {
  constructor(private readonly livenessService: LivenessService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  create(@UploadedFile() video: Express.Multer.File) {
    return this.livenessService.create(video);
  }
}