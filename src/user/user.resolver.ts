import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserUpdateInput } from './input/user-update.input'


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

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserEntity])
  async getAll() {
    return await this.userService.getAll()
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return await this.userService.removeById(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('user') user: UserUpdateInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(user)
  }

}
