import { Controller,Get,HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService,
        private readonly usersService: UsersService,
        private readonly eventsService: EventsService
      ) {}

    @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const users = await this.usersService.findAll();
    const events = await this.eventsService.findAll();

        const base_count = users.length
        const total_requests = events.length
      return {base_count, total_requests};
  }

}
