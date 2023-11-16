import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo: Repository<Users>,
      ) {}
    
      findAll() {
        return this.usersRepo.find();
      }
    
      async findOne(id: number) {
        return await this.usersRepo.findOneBy({ id });
      }
    
      async create(data: CreateUsersDto, image: Express.Multer.File) {
        const query = this.usersRepo.create();
        query.full_name = data.full_name;
        query.passport = data.passport;
        query.pass_issue_date = data.pass_issue_date;
        query.pinfl = data.pinfl;
        query.place_of_birth = data.place_of_birth;
        query.date_of_birth = data.date_of_birth;
        query.image = image.filename;
    
        await this.usersRepo.save(query);
        return query;
      }
    
      async update(id: number, body: UpdateUsersDto) {
        await this.usersRepo.update({ id }, body);
        return await this.usersRepo.findOneBy({ id });
      }
    
      async delete(id: number) {
        return await this.usersRepo.delete({ id });
      }
}
