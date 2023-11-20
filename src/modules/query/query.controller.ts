import { Controller, Get, Param, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, Bind} from '@nestjs/common';
import { QueryService } from './query.service';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('query')
@ApiTags('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Bind(UploadedFiles())
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]))
  async create(
    @UploadedFiles() files: { image1?: Express.Multer.File[], image2?: Express.Multer.File[] },
  ) {    
    return this.queryService.create( files.image1, files.image2);
  }
}
