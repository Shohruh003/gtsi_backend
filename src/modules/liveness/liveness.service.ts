import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Liveness } from './liveness.entity';
@Injectable()
export class LivenessService {
    constructor(
        @InjectRepository(Liveness)
        private readonly livenessRepo: Repository<Liveness>,
      ) {}
    
      async create(video: Express.Multer.File) {
        const formData1 = new FormData();
    formData1.append('video', new Blob([video.buffer]), video.originalname);
  
    const response = await axios.post('http://95.47.127.26:50008/Video/Liveness', formData1, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
        const liveness = this.livenessRepo.create();
        liveness.liveness = response.data.success
    
        await this.livenessRepo.save(liveness);
        return liveness;
      }
}
