import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode, HttpStatus, UseInterceptors, UploadedFiles, Bind} from '@nestjs/common';
import { QueryService } from './query.service';
import { UpdateQueryDto } from './dto/update-query.dto';
import { CreateQueryDto } from './dto/create-query.dto';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/helpers/multer';

@Controller('query')
@ApiTags('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      example: {
        full_name: 'string'
      }
    }
  })
  getAll() {
    return this.queryService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.queryService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Bind(UploadedFiles())
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ], multerOptions))
  async create(
    @UploadedFiles() files: { image1?: Express.Multer.File[], image2?: Express.Multer.File[] },
    @Body() createQueryDto: CreateQueryDto
  ) {    
    return this.queryService.create(createQueryDto, files.image1, files.image2);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateQueryDto) {
    this.queryService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.queryService.delete(id);
  }
}
