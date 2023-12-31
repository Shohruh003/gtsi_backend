/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'querys' })
export class Query extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable : true
  })
  confidence: string;
}
