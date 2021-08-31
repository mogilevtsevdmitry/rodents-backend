import { Column, Entity } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

import { BaseEntity } from '../base/base.entity'

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ unique: true })
  email: string

  @Field({ nullable: false })
  @Column()
  password: string
}
