import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  video: string;
}
