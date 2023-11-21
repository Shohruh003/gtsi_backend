import { Controller,Query, Delete, Get, Param, Patch, Post, Body, HttpCode, HttpStatus, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterUsersDto } from './dto/filter-users.dto';
  
@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

     
    @Get()
    @HttpCode(HttpStatus.OK)
    async findByFilters(@Query() filters: FilterUsersDto) {
      const results = await this.usersService.findByFilters(
        filters.full_name,
        filters.gender,
        filters.passport_series,
        filters.passport_number,
        filters.pinfl
      );
      const count = results.length;
      return { count, results };
    }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(+user_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createUsersDto: CreateUsersDto, @UploadedFile() image: Express.Multer.File) {
    return this.usersService.create(createUsersDto, image);
  }

  @Patch(':user_id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('user_id') user_id: number, @Body() body: UpdateUsersDto) {
    return await this.usersService.update(user_id, body);
  }
  
  @Delete(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('user_id') user_id: number) {
    await this.usersService.delete(user_id);
    return {}; // Bo'sh javob qaytarish
  }
}
