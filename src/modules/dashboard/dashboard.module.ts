import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.entity';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { EventsService } from '../events/events.service';
import { Event } from '../events/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, Users, Event])],
  controllers: [DashboardController],
  providers: [DashboardService, UsersService, EventsService],
})
export class DashboardModule {}
