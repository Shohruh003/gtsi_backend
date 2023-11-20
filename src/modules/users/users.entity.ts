/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  full_name: string;

  @Column({
    nullable: true,
  })
  gender: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  birth_date: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  nationality: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  place_of_birth: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  cityzenship_country_name: string;

  @Column({
    nullable: true,
  })
  cityzenship_country_code: number;
  
  @Column({
    type: 'varchar',
    nullable: true,
  })
  pinfl: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  birth_country_name: string;

  @Column({
    nullable: true,
  })
  birth_country_code: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  passport_issue: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  passport_expiration: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  internal_affairs_name: string;

  @Column({
    nullable: true,
  })
  internal_affairs_code: number;

  @Column({
    nullable: true,
  })
  physical_condition: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  nationality_code: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  passport_series: string;

  @Column({
    nullable: true,
  })
  passport_number: number;

  @Column({
    nullable : false
  })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;
}
