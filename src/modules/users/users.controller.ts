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
        id: 4,
        user_id: 159,
        full_name: "Azimov Shoxruxbek Nabijon o'g'li",
        gender: false,
        birth_date: "2003-02-17",
        nationality: "o'zbek",
        place_of_birth: "Namangan tumani",
        cityzenship_country_name: "Uzbekistan",
        cityzenship_country_code: 0,
        pinfl: "12345678912345",
        birth_country_name: "Uzbekistan",
        birth_country_code: 0,
        passport_issue: "2019-21-12",
        passport_expiration: "2029-12-027",
        internal_affairs_name: "Namangan viloyati, Namangan tumani IIB",
        internal_affairs_code: 0,
        physical_condition: false,
        nationality_code: "0000000",
        passport_series: "AC",
        passport_number: 2345678,
        created_date: '2023-11-20T11:31:37.112Z',
        image: "image.jpg"
      }
    }
  })
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(+user_id);
  }

  @Post()
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
