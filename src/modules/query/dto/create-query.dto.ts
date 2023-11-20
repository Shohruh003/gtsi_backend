import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image2: string;
}
