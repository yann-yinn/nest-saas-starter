import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createCheckoutSessionDto {
  @IsNotEmpty()
  @ApiProperty()
  priceId!: string;
}
