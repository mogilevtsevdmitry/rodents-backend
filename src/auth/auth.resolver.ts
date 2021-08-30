import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { UserInput } from '../user/user.input'
import { UserEntity } from '../user/user.entity'
import { TokenDto } from './token-dto'


@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(returns => TokenDto)
  async login(@Args('user') user: UserInput) {
    return await this.authService.login(user)
  }

  @Mutation(returns => UserEntity)
  async register(@Args('user') user: UserInput) {
    return await this.authService.register(user)
  }
}
