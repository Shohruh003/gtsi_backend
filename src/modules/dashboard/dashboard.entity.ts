/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dashboard' })
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

   @Column({
    nullable: true,
  })
  base_count: number;

  @Column({
    nullable: true,
  })
  total_requests: string;

  @Column({
    nullable: true,
  })
  year_requests: string;

  @Column({
    nullable: true,
  })
  month_requests: string;

  @Column({
    nullable: true,
  })
  day_requests: string;

  @Column({
    nullable: true,
  })
  total_attacks: string;

  @Column({
    nullable: true,
  })
  year_attacks: string;

  @Column({
    nullable: true,
  })
  month_attacks: string;

  @Column({
    nullable: true,
  })
  day_attacks: string;

  @Column({
    nullable: true,
  })
  request_speed: string;
}