import { ApiProperty } from '@nestjs/swagger';

export class CreateEventsDto {
  @ApiProperty({
    required: false,
    description: 'Foydalanuvchining MAC manzili',
  })
  mac_address: string;

  @ApiProperty({
    format: 'binary',
    required: false,
    description: 'Videofayl',
  })
  video: string;

  created_date: Date;
}