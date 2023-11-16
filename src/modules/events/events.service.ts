import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventsDto } from './dto/create-events.dto';
import { Event } from './events.entity';
import axios from 'axios';
import * as fs from 'fs';
import FormData from 'form-data';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
  ) {}

  findAll() {
    return this.eventsRepo.find();
  }

  async findOne(id: number) {
    return await this.eventsRepo.findOne({ where: { id } });
  }

  async create(data: CreateEventsDto, video: Express.Multer.File) {
    let cardImage: string;

    try {
      const formData = new FormData();
      formData.append('video', video.buffer);
    
      const response = await axios.post('http://95.47.127.26:50008/Video/Liveness', formData, {
        headers: formData.getHeaders(),
      });
    
      if (response.data.success) {
        const base64Image = response.data.data.normalized;
        const outputPath = join(__dirname, '..', '..', 'uploads', 'cards', 'converted_image.jpg');
        convertBase64ToJpg(base64Image, outputPath);
        cardImage = outputPath;
    
        const formData2 = new FormData();
        formData2.append('token', '4755f02e0afcf920c723b644d5bcabcc');
        formData2.append('fullframe', createReadStream(outputPath));
        formData2.append('rotate', 'true');
        formData2.append('camera', '5');
        formData2.append('mf_selector', 'biggest');
    
        const response2 = await axios.post(
          'https://faceids.tadi.uz/events/faces/add/',
          formData2,
          {
            headers: {
              ...formData2.getHeaders(),
              Accept: 'application/json',
              Authorization: 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a',
            },
          }
        );
    
        console.log(response2.data);
      }
    } catch (error) {
      console.error(error);
    }
    // const event = this.eventsRepo.create({
    //   mac_address: data.mac_address,
    //   video: cardImage,
    // });

    // return this.eventsRepo.save(event);
  }
}

function convertBase64ToJpg(base64String: string, outputPath: string) {
  const base64Image = base64String.split(';base64,').pop();
  fs.writeFileSync(outputPath, base64Image, { encoding: 'base64' });
}