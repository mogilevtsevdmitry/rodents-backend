import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class UserCreateInput {
  @Field({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email?: string

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  password?: string
}