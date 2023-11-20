import { Controller, Get, Param, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LivenessService } from './liveness.service';

@Controller('liveness')
@ApiTags('liveness')
export class LivenessController {
    constructor(private readonly livenessService: LivenessService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  create(@UploadedFile() video: Express.Multer.File) {
    return this.livenessService.create(video);
  }
}
