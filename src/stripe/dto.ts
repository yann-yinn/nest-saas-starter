import { IsNotEmpty } from 'class-validator';

export class createCheckoutSessionDto {
  @IsNotEmpty()
  priceId!: string;
}
