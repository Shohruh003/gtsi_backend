import { Controller, Get, Param, Post, HttpCode, HttpStatus, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

     
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.eventsService.findAll();
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('user_id') user_id: string) {
    return this.eventsService.findOne(+user_id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('video'))
  create(@Body() createEventsDto: CreateEventsDto, @UploadedFile() video: Express.Multer.File) {
    return this.eventsService.create(createEventsDto, video);
  }
  
}
