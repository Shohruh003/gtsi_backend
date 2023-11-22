import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventsDto } from './dto/create-events.dto';
import { Event } from './events.entity';
import axios from 'axios';
import * as fs from 'fs';
import { FilterEventsDto } from './dto/filter-events.dto';

@Injectable()
export class EventsService {
  private macAddresses: { [macAddress: string]: { count: number, lastUpdated: number } } = {};

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
  ) {}

  findAll() {
    return this.eventsRepo.find();
  }

  async findByFilters(filters: FilterEventsDto) {
    let events = this.eventsRepo.createQueryBuilder('event');
    
    if (filters.full_name) {
      events = events.andWhere('event.full_name LIKE :fullName', { fullName: `%${filters.full_name}%` });
    }
    
    if (filters.gender) {
      events = events.andWhere('event.gender = :gender', { gender: filters.gender });
    }
    
    if (filters.mac_address) {
      events = events.andWhere('event.mac_address LIKE :macAddress', { macAddress: `%${filters.mac_address}%` });
    }
    
    if (filters.created_date) {
      const startDate = new Date(filters.created_date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(filters.created_date);
      endDate.setHours(23, 59, 59, 999);
      events = events.andWhere('event.created_date BETWEEN :startDate AND :endDate', { startDate, endDate });
    }
    
    if (filters.year) {
      const startDate = new Date(`${filters.year}-01-01T00:00:00Z`);
      const endDate = new Date(`${filters.year}-12-31T23:59:59Z`);
      events.andWhere('event.created_date >= :startDate', { startDate })
            .andWhere('event.created_date <= :endDate', { endDate });
    }
    
    if (filters.month) {
      events.andWhere('EXTRACT(MONTH FROM event.created_date) = :month', { month: filters.month });
    }
    
    if (filters.day) {
      events.andWhere('EXTRACT(DAY FROM event.created_date) = :day', { day: filters.day });
    }
    
    return await events.getMany();
  }

  async findOne(user_id: number) {
    return await this.eventsRepo.findOne({ where: { user_id } });
  }

  async create(data: CreateEventsDto, video: Express.Multer.File) {
    const macAddressData = this.macAddresses[data?.mac_address];
    const currentTime = Date.now();
    const timeDifferenceThreshold = 1 * 60 * 1000;

    if (!macAddressData || currentTime - macAddressData.lastUpdated >= timeDifferenceThreshold) {
      this.macAddresses[data?.mac_address] = { count: 1, lastUpdated: currentTime };
    } else {
      macAddressData.count++;
      this.macAddresses[data?.mac_address].lastUpdated = currentTime;
    }

    const count = macAddressData?.count || 0;

    const formData1 = new FormData();
    formData1.append('video', new Blob([video.buffer]), video.originalname);
  
    const response = await axios.post('http://95.47.127.26:50008/Video/Liveness', formData1, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    let card = null;
    let baseImg = null
    let event = null

    if (response.data.success) {

      const base64Image = response.data.data.normalized;
      const buffer = Buffer.from(base64Image, "base64");
  
      const fileName = "image.jpg";
      fs.writeFileSync(fileName, buffer);
  
      const fileData = fs.readFileSync(fileName);
      const blobData = new Blob([fileData], { type: "image/jpeg" });
      
      const formData = new FormData();
      formData.append("fullframe", blobData, "image.jpg");
      formData.append("rotate", "true");
      formData.append("camera", "5");
      formData.append("mf_selector", "biggest");
      formData.append("token", "4755f02e0afcf920c723b644d5bcabcc");
  
      try {
        const addResponse = await axios.post("https://faceids.tadi.uz/events/faces/add/", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
  
        const events = addResponse.data.events;
  
        const getResponse = await axios.get(`https://faceids.tadi.uz/events/faces/${events}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a",
          },
        });
  
        card = getResponse.data;
      } catch (error) {
        console.error(error);
      }

      fs.unlinkSync(fileName);
      
      const objectImg = await axios.get(`https://faceids.tadi.uz/objects/faces/${card.matched_object}/`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a'
    }  
  });
  baseImg = objectImg.data.thumbnail


  event = this.eventsRepo.create({
    mac_address: data?.mac_address,
    full_name: card?.verbose_matched_card?.name ? card?.verbose_matched_card?.name : 'Неизвестно',
    created_date: data?.created_date,
    user_id: card?.verbose_matched_card?.id,
    thumbnail: card?.thumbnail ? card?.thumbnail : null,
    baseImg: baseImg ? baseImg : null,
    liveness: true,
    one_n: true,
    one_one: true,
    attack: false
  });
} else {
      
      if (count >= 3) {
        event = this.eventsRepo.create({
          mac_address: data?.mac_address,
          full_name: 'Неизвестно',
          created_date: data?.created_date,
          user_id: null,
          thumbnail: null,
          baseImg: null,
          liveness: false,
          one_n: false,
          one_one: false,
          attack: true
        });
      }else {
        event = this.eventsRepo.create({
          mac_address: data?.mac_address,
          full_name: 'Неизвестно',
          created_date: data?.created_date,
          user_id: null,
          thumbnail: null,
          baseImg: null,
          liveness: false,
          one_n: false,
          one_one: false,
          attack: false
        });}
    }

    


  
    return this.eventsRepo.save(event);
  }


  async delete(id: number) {
    await this.eventsRepo.delete({ id });
  }
}