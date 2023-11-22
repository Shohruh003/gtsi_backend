import { Controller, Query, Delete, Get, Param, Patch, Post, Body, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterUsersDto } from './dto/filter-users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns a list of users', type: CreateUsersDto, isArray: true })
  async findAll(@Query() filters: FilterUsersDto) {
    const results = await this.usersService.findByFilters(filters);
    const count = results.length;
    return { count, results };
  }

  @Get(':user_id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns a user', type: CreateUsersDto })
  async findOne(@Param('user_id') user_id: number) {
    const user = await this.usersService.findOne(user_id);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() data: CreateUsersDto, @UploadedFile() image: Express.Multer.File) {
    const user = await this.usersService.create(data, image);
    return user;
  }

  @Patch(':user_id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Updates a user', type: CreateUsersDto })
  async update(@Param('user_id') user_id: number, @Body() body: UpdateUsersDto) {
    const updatedUser = await this.usersService.update(user_id, body);
    return updatedUser;
  }

  @Delete(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('user_id') user_id: number) {
    await this.usersService.delete(user_id);
  }
}