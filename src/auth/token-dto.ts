
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class TokenDto {
  @Field()
  id: number
  @Field()
  access_token: string
  @Field()
  expiresIn: number
}
