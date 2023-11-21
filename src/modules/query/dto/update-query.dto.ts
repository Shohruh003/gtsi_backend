import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;
}
