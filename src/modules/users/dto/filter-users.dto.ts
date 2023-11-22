import { ApiProperty } from '@nestjs/swagger';

export class FilterUsersDto {
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
    description: 'Passport series of the user',
  })
  passport_series?: string;

  @ApiProperty({
    required: false,
    description: 'Passport number of the user',
  })
  passport_number?: number;

  @ApiProperty({
    required: false,
    description: 'PINFL (Personal Identification Number of the Individual) of the user',
  })
  pinfl?: string;

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