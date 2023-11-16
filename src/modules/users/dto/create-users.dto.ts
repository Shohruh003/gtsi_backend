import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passport: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pinfl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place_of_birth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pass_issue_date: string;
}
