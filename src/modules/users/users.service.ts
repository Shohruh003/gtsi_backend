import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { FilterUsersDto } from '../users/dto/filter-users.dto';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findByFilters(filters: FilterUsersDto) {
    let user = this.usersRepo.createQueryBuilder('user');

    if (filters.full_name) {
      user.andWhere('user.full_name LIKE :fullName', { fullName: `%${filters.full_name}%` });
    }

    if (filters.gender !== undefined) {
      user.andWhere('user.gender = :gender', { gender: filters.gender });
    }

    if (filters.passport_series) {
      user.andWhere('user.passport_series LIKE :passportSeries', { passportSeries: `%${filters.passport_series}%` });
    }

    if (filters.passport_number) {
      user.andWhere('user.passport_number LIKE :passportNumber', { passportNumber: `%${filters.passport_number}%` });
    }

    if (filters.pinfl) {
      user.andWhere('user.pinfl LIKE :pinfl', { pinfl: `%${filters.pinfl}%` });
    }

    if (filters.created_date) {
      const startDate = new Date(filters.created_date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(filters.created_date);
      endDate.setHours(23, 59, 59, 999);
      user = user.andWhere('user.created_date BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (filters.year) {
      const startDate = new Date(`${filters.year}-01-01T00:00:00Z`);
      const endDate = new Date(`${filters.year}-12-31T23:59:59Z`);
      user.andWhere('user.created_date >= :startDate', { startDate }).andWhere('user.created_date <= :endDate', { endDate });
    }

    if (filters.month) {
      user.andWhere('EXTRACT(MONTH FROM user.created_date) = :month', { month: filters.month });
    }

    if (filters.day) {
      user.andWhere('EXTRACT(DAY FROM user.created_date) = :day', { day: filters.day });
    }

    return await user.getMany();
  }

  async findOne(user_id: number) {
    return await this.usersRepo.findOne({ where: { user_id } });
  }

  async create(data: CreateUsersDto, image: Express.Multer.File) {
    const user = this.usersRepo.create();
    user.full_name = data.full_name;
    user.gender = data.gender;
    user.birth_date = data.birth_date;
    user.nationality = data.nationality;
    user.nationality_code = data.nationality_code;
    user.place_of_birth = data.place_of_birth;
    user.cityzenship_country_name = data.cityzenship_country_name;
    user.cityzenship_country_code = data.cityzenship_country_code;
    user.pinfl = data.pinfl;
    user.birth_country_name = data.birth_country_name;
    user.birth_country_code = data.birth_country_code;
    user.passport_issue = data.passport_issue;
    user.passport_expiration = data.passport_expiration;
    user.internal_affairs_name = data.internal_affairs_name;
    user.internal_affairs_code = data.internal_affairs_code;
    user.physical_condition = data.physical_condition;
    user.passport_series = data.passport_series;
    user.passport_number = data.passport_number;
    user.created_date = data.created_date;
    user.image = image.originalname;

    await this.usersRepo.save(user);
    return user;
  }

  async update(user_id: number, body: UpdateUsersDto) {
    await this.usersRepo.update({ user_id }, body);
    return await this.usersRepo.findOne({ where: { user_id } });
  }

  async delete(user_id: number) {
    await this.usersRepo.delete({ user_id });
  }
}