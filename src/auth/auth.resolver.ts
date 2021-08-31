import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { UserCreateInput } from '../user/input/user-create.input'
import { UserEntity } from '../user/user.entity'
import { AuthService } from './auth.service'
import { TokenDto } from './token-dto'


@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => TokenDto)
  async login(@Args('user') user: UserCreateInput) {
    return await this.authService.login(user)
  }

  @Mutation(() => UserEntity)
  async register(@Args('user') user: UserCreateInput) {
    return await this.authService.register(user)
  }
}
