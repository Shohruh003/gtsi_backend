import { Controller,Body, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Param} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SearchFaceService } from './search-face.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('search-face')
@ApiTags('search-face')
export class SearchFaceController {
    constructor(private readonly searchFaceService: SearchFaceService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('image'))
    async create(@UploadedFile() image: Express.Multer.File) {
      const createdSearchFace = await this.searchFaceService.create(image);
      return createdSearchFace;
    }
}