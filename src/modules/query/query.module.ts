import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { Query } from './query.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query])
  ],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}