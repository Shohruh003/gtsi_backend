import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birth_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place_of_birth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cityzenship_country_name: string;

  @ApiProperty()
  @IsNotEmpty()
  cityzenship_country_code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pinfl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birth_country_name: string;

  @ApiProperty()
  @IsNotEmpty()
  birth_country_code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passport_issue: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passport_expiration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  internal_affairs_name: string;

  @ApiProperty()
  @IsNotEmpty()
  internal_affairs_code: number;

  @ApiProperty()
  @IsNotEmpty()
  physical_condition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nationality_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passport_series: string;

  @ApiProperty()
  @IsNotEmpty()
  passport_number: number;

  created_date: Date;

}
