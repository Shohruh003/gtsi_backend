/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'search_face' }) 
export class SearchFace extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column('text', { array: true })
  user_id: string[];
}