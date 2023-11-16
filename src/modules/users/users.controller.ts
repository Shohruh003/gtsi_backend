import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode, HttpStatus, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { multerOptions } from 'src/helpers/multer';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
  
@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

     
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
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(@Body() createUsersDto: CreateUsersDto, @UploadedFile() image: Express.Multer.File) {
    return this.usersService.create(createUsersDto, image);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateUsersDto) {
    this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.usersService.delete(id);
  }
}
