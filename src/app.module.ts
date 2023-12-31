import { Module } from '@nestjs/common';
import { QueryModule } from './modules/query/query.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from './modules/query/query.entity';
import { config } from './config';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/users.entity';
import { EventsModule } from './modules/events/events.module';
import { Event } from './modules/events/events.entity';
import { LivenessModule } from './modules/liveness/liveness.module';
import { Liveness } from './modules/liveness/liveness.entity';
import { SearchFaceModule } from './modules/search-face/search-face.module';
import { SearchFace } from './modules/search-face/search-face.entity';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { Dashboard } from './modules/dashboard/dashboard.entity';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
      username: process.env.DB_USER,
      entities: [Query, Users, Event, Liveness, SearchFace, Dashboard],
      synchronize: true,
    }),
    QueryModule,
    UsersModule,
    EventsModule,
    LivenessModule,
    SearchFaceModule,
    DashboardModule]
})
export class AppModule {}
