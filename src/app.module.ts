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
      entities: [Query, Users, Event],
      synchronize: true,
    }),
    QueryModule,
    UsersModule,
    EventsModule]
})
export class AppModule {}
