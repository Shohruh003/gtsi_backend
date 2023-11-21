import { Controller, Get, Param, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, Bind} from '@nestjs/common';
import { QueryService } from './query.service';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('query')
@ApiTags('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image1: {
          type: 'string',
          format: 'binary',
        },
        image2: {
          type: 'string',
          format: 'binary',
        }
      },
    },
  })
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
