/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

   @Column({
    nullable: true,
  })
  user_id: number;

  @Column({
    nullable: true,
  })
  liveness: boolean;

  @Column({
    nullable: true,
  })
  one_n: boolean;

  @Column({
    nullable: true,
  })
  one_one: boolean;

  @Column({
    nullable: true,
  })
  attack: boolean;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  mac_address: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  full_name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  thumbnail: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  baseImg: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

}