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
    description: 'Filter year',
  })
  year?: string;

  @ApiProperty({
    required: false,
    description: 'Filter month',
  })
  month?: string;


  @ApiProperty({
    required: false,
    description: 'Filter day',
  })
  day?: string;
}
