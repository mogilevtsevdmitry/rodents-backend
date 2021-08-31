import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  id: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(6)
  password: string
}