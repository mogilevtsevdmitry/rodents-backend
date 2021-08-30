import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserInput } from './user.input'


@Resolver('Users')
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUserById(
    @Args(
      'id',
      { type: () => ID },
    ) id: number,
  ): Promise<UserEntity> {
    return await this.userService.getById(id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUserByEmail(@Args('email') email: string): Promise<UserEntity> {
    return await this.userService.getByEmail(email)
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('user') user: UserInput): Promise<UserEntity> {
    return await this.userService.create(user)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return await this.userService.delete(id)
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(returns => Boolean)
  // async updateUser(@Args('user') user: Partial<UserEntity>): Promise<boolean> {
  //   return await this.userService.update(user)
  // }

}
