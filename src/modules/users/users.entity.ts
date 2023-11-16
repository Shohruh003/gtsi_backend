/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
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
  passport: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  pinfl: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  date_of_birth: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  place_of_birth: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  pass_issue_date: string;

  @Column({
    nullable : false
  })
  image: string;
}
