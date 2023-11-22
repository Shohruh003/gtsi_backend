// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Dashboard } from './dashboard.entity';

// @Injectable()
// export class DashboardService {
//   constructor(
//     @InjectRepository(Dashboard)
//     private readonly dashboardRepo: Repository<Dashboard>,
//   ) {}

//   findAll() {
//     return this.dashboardRepo.find();
//   }

//   async create(data: any) {
//     console.log(data);
//     const dashboard = this.dashboardRepo.create()
//         dashboard.base_count = data

//     console.log(dashboard);
    
//     // await this.usersRepo.save(user);
//     // return user;
//   }
// }




import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepo: Repository<Dashboard>
  ) {}

  findAll() {
    return this.dashboardRepo.find();
  }

}