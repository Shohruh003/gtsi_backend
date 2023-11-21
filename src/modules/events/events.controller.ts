import { Controller, Get, Param, Post, HttpCode, HttpStatus, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilterEventsDto } from './dto/filter-events.dto';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters: FilterEventsDto) {
    const results = await this.eventsService.findAll(
      filters.full_name,
      filters.mac_address
    );
    const count = results.length;
    return { count, results };
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('user_id') user_id: string) {
    return this.eventsService.findOne(+user_id);
  }

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  create(
    @UploadedFile() video: Express.Multer.File,
    @Body() createEventsDto: CreateEventsDto,
  ) {
    return this.eventsService.create(createEventsDto, video);
  }
}
