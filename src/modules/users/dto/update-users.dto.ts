import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  // @ApiProperty()
  // @IsBoolean()
  // gender: boolean;

  // @ApiProperty()
  // @IsString()
  // birth_date: string;

  // @ApiProperty()
  // @IsString()
  // nationality: string;

  // @ApiProperty()
  // @IsString()
  // place_of_birth: string;

  // @ApiProperty()
  // @IsString()
  // cityzenship_country_name: string;

  // @ApiProperty()
  // @IsNumber()
  // cityzenship_country_code: number;

  // @ApiProperty()
  // @IsString()
  // pinfl: string;

  // @ApiProperty()
  // @IsString()
  // birth_country_name: string;

  // @ApiProperty()
  // @IsNumber()
  // birth_country_code: number;

  // @ApiProperty()
  // @IsString()
  // passport_issue: string;

  // @ApiProperty()
  // @IsString()
  // passport_expiration: string;

  // @ApiProperty()
  // @IsString()
  // internal_affairs_name: string;

  // @ApiProperty()
  // @IsNumber()
  // internal_affairs_code: number;

  // @ApiProperty()
  // @IsBoolean()
  // physical_condition: boolean;

  // @ApiProperty()
  // @IsString()
  // nationality_code: string;

  // @ApiProperty()
  // @IsString()
  // passport_series: string;

  // @ApiProperty()
  // @IsNumber()
  // passport_number: number;
}
