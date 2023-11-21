import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { SearchFace } from './search-face.entity';
import * as blobUtil from 'blob-util';

@Injectable()
export class SearchFaceService {
    constructor(
        @InjectRepository(SearchFace)
        private readonly searchFaceRepo: Repository<SearchFace>,
      ) {}
    
      async create(image: Express.Multer.File) {
        
        let imageId = null;
        let imageIds = []
        const form = new FormData();
        form.append('attributes', '{"face": {}}');

        const imageBlob = blobUtil.createBlob([image.buffer], { type: image.mimetype });
        form.append('photo', imageBlob, image.originalname);

        try {
          const response = await axios.post(
            'https://faceids.tadi.uz/detect',
            form,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a',
              },
            }
          );
        
          response.data.objects.face.forEach((e) => {
            imageId = e.id
            // imageIds.push(e.id);
          });
        } catch (error) {
          console.log(error);
          throw new Error('Failed to detect face.');
        }
        console.log(imageId);
        
        const searchFace = new SearchFace();
        searchFace.id = imageId;
        return searchFace;
      }
}