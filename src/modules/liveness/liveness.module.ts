import { Module } from '@nestjs/common';
import { LivenessController } from './liveness.controller';
import { LivenessService } from './liveness.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liveness } from './liveness.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Liveness])
  ],
  controllers: [LivenessController],
  providers: [LivenessService]
})
export class LivenessModule {}
