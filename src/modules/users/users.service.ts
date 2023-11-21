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
    
      async findByFilters(fullName?: string, gender?: boolean, passportSeries?: string, passportNumber?: number, pinfl?: string) {
        const query = this.usersRepo.createQueryBuilder('user');
      
        if (fullName) {
          query.andWhere('user.full_name LIKE :fullName', { fullName: `%${fullName}%` });
        }
      
        if (gender !== undefined) {
          query.andWhere('user.gender = :gender', { gender });
        }
      
        if (passportSeries) {
          query.andWhere('user.passport_series LIKE :passportSeries', { passportSeries: `%${passportSeries}%` });
        }
      
        if (passportNumber) {
          query.andWhere('user.passport_number LIKE :passportNumber', { passportNumber: `%${passportNumber}%` });
        }
      
        if (pinfl) {
          query.andWhere('user.pinfl LIKE :pinfl', { pinfl: `%${pinfl}%` });
        }
      
        return await query.getMany();
      }
    
      async findOne(user_id: number) {
        return await this.usersRepo.findOneBy({ user_id });
      }
    
      async create(data: CreateUsersDto, image: Express.Multer.File) {
        const users = this.usersRepo.create();
        // users.user_id = data.user_id;
        users.full_name = data.full_name;
        users.gender = data.gender;
        users.birth_date = data.birth_date;
        users.nationality = data.nationality;
        users.nationality_code = data.nationality_code;
        users.place_of_birth = data.place_of_birth;
        users.cityzenship_country_name = data.cityzenship_country_name;
        users.cityzenship_country_code = data.cityzenship_country_code;
        users.pinfl = data.pinfl;
        users.birth_country_name = data.birth_country_name;
        users.birth_country_code = data.birth_country_code;
        users.passport_issue = data.passport_issue;
        users.passport_expiration = data.passport_expiration;
        users.internal_affairs_name = data.internal_affairs_name;
        users.internal_affairs_code = data.internal_affairs_code;
        users.physical_condition = data.physical_condition;
        users.passport_series = data.passport_series;
        users.passport_number = data.passport_number;
        users.created_date = data.created_date
        users.image = image.originalname;
    
        await this.usersRepo.save(users);
        return users;
      }
    
      async update(user_id: number, body: UpdateUsersDto) {
        await this.usersRepo.update({ user_id }, body);
        return await this.usersRepo.findOneBy({ user_id });
      }
      
      async delete(user_id: number) {
        await this.usersRepo.delete({ user_id });
      }
}
