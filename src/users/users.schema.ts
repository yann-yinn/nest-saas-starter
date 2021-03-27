import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  email!: string;

  @Prop()
  verifiedEmail!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
