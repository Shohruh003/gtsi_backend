import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mac_address: string;
}
