import { Column, Entity } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { BaseEntity } from '../base/base.entity'

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column()
  email: string

  @Field({ nullable: false })
  @Column()
  password: string
}
