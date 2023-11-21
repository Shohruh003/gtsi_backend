import { Module } from '@nestjs/common';
import { SearchFaceController } from './search-face.controller';
import { SearchFaceService } from './search-face.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchFace } from './search-face.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchFace])
  ],
  controllers: [SearchFaceController],
  providers: [SearchFaceService]
})
export class SearchFaceModule {}
