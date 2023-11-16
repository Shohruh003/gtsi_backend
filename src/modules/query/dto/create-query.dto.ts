import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mac_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  liveness: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  one_n: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  one_one: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attack: string;

  @ApiProperty()
  create_date: Date;
}
