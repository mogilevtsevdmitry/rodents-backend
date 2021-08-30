import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'
import { UserEntity } from '../user/user.entity'
import { AuthHelper } from './auth.helper'
import { TokenDto } from './token-dto'
import { UserInput } from '../user/user.input'


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async login(user: Partial<UserEntity>): Promise<TokenDto> {
    const candidate = await this.userService.getByEmail(user.email)
    if (!candidate) {
      throw new NotFoundException(`Пользователь с email ${user.email} не найден!`)
    }
    const isMath = AuthHelper.validate(user.password, candidate.password)
    if (!isMath) {
      throw new Error('Пароли не совпадают!')
    }
    const payload: {email: string, userId: number} = { email: candidate.email, userId: candidate.id }
    const token = `Bearer ${this.jwtService.sign(payload)}`
    return {
      id: candidate.id,
      access_token: token,
      expiresIn: Number(process.env.JWT_EXPIRESIN)
    }
  }

  async register(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.userService.create(user)
  }

  async validateUser(payload: UserInput) {
    return this.userService.getByEmail(payload.email)
  }
}
