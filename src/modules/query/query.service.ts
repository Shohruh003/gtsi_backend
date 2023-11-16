import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './query.entity';
import { Repository } from 'typeorm';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';


@Injectable()
export class QueryService {
    constructor(
        @InjectRepository(Query)
        private readonly queryRepo: Repository<Query>,
      ) {}
    
      findAll() {
        return this.queryRepo.find();
      }
    
      async findOne(id: number) {
        return await this.queryRepo.findOneBy({ id });
      }
    
      async create(data: CreateQueryDto, image1: Express.Multer.File[], image2: Express.Multer.File[]) {
        const query = this.queryRepo.create();
        query.full_name = data.full_name;
        query.mac_address = data.mac_address;
        query.liveness = data.liveness;
        query.attack = data.attack;
        query.one_n = data.one_n;
        query.one_one = data.one_one;
        query.image1 = image1[0].filename;
        query.image2 = image2[0].filename;
        query.create_date = data.create_date;
    
        await this.queryRepo.save(query);
        return query;
      }
    
      async update(id: number, body: UpdateQueryDto) {
        await this.queryRepo.update({ id }, body);
        return await this.queryRepo.findOneBy({ id });
      }
    
      async delete(id: number) {
        return await this.queryRepo.delete({ id });
      }
}
