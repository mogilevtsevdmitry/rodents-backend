import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({nullable: false})
  email: string

  @Field({nullable: false})
  password: string
}