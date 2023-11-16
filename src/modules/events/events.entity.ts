/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  mac_address: string;

  @Column({
    nullable: false
  })
  video: string;
}