import { ApiProperty } from '@nestjs/swagger';
export class FilterEventsDto {
  @ApiProperty({
    required: false,
    description: 'Full name of the user',
  })
  full_name?: string;

  @ApiProperty({
    required: false,
    description: 'Gender of the user',
  })
  gender?: boolean;

  @ApiProperty({
    required: false,
    description: 'MAC address of the user',
  })
  mac_address?: string;

  @ApiProperty({
    required: false,
    description: 'Created date of the event',
    type: Date,
  })
  created_date?: Date;

  @ApiProperty({
    required: false,
    description: 'Year of the event',
    type: Number,
  })
  year?: number;

  @ApiProperty({
    required: false,
    description: 'Month of the event',
    type: Number,
  })
  month?: number;

  @ApiProperty({
    required: false,
    description: 'Day of the event',
    type: Number,
  })
  day?: number;
}
