/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'querys' })
export class Query extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  full_name: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  mac_address: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  liveness: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  one_n: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  one_one: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  attack: string;

  @Column({
    nullable : false
  })
  image1: string;
  
  @Column({
    nullable : false
  })
  image2: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;
}
