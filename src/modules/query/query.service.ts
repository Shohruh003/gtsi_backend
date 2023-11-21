import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './query.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as blobUtil from 'blob-util';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Query)
    private readonly queryRepo: Repository<Query>,
  ) {}

  async create(image1: Express.Multer.File[], image2: Express.Multer.File[]) {
    let image1Id = null;
    let image2Id = null;
    const form = new FormData();
    form.append('attributes', '{"face": {}}');

    const image1Blob = blobUtil.createBlob([image1[0].buffer], { type: image1[0].mimetype });
    form.append('photo', image1Blob, image1[0].originalname);

    try {
      const response = await axios.post(
        'https://faceids.tadi.uz/detect',
        form,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a'
          }
        });

      image1Id = response.data.objects.face[0].id;
    } catch (error) {
      console.log(error);
    }

    const form2 = new FormData();
    form2.append('attributes', '{"face": {}}');

    const image2Blob = blobUtil.createBlob([image2[0].buffer], { type: image2[0].mimetype });
    form2.append('photo', image2Blob, image2[0].originalname);

    try {
      const response = await axios.post(
        'https://faceids.tadi.uz/detect',
        form2,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a'
          }
        });

        image2Id = response.data.objects.face[0].id;
    } catch (error) {
      console.log(error);
    }


    const response = await axios.get('https://faceids.tadi.uz/verify', {
  params: {
    'object1': `detection:${image1Id}`,
    'object2': `detection:${image2Id}`
  },
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Token 61b1d3c13cfb8ff23fc72d15f5b6e38f54530740d8e476066ff86b545246cd5a'
  }
})

    const query = this.queryRepo.create();
    query.confidence = response.data.confidence

    // await this.queryRepo.save(query);
    return query;
  }
}