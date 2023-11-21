/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'search_face' }) 
export class SearchFace extends BaseEntity {

  @Column({
    nullable: true,
  })
  id: string[];
}